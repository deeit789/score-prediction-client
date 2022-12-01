import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  InputNumber,
  Input,
  Avatar,
  Statistic,
  Button,
  notification,
  Form,
  Spin,
  Modal,
} from "antd";
import { ClockCircleOutlined, UserOutlined } from "@ant-design/icons";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Keyboard, Navigation } from "swiper";
import moment from "moment";

import {
  matchByDate,
  getTimeSystem,
  postMatch,
  getIP,
  getFP,
} from "../../helpers/helper";

import ModalHistory from "../../components/modalHistory";

import logo_shbet_wc2022 from "../../assets/images/789bet/logo-wc-ls.png";
import bg from "../../assets/images/789bet/bg.png";

import { dt_date } from "../../helpers/common";
const { Countdown } = Statistic;

const getCurrentTimeMS = async () => {
  const time = await getTimeSystem();
  return time.data.servertime || null;
};

function BET789() {
  const [mySwiper, setSwiper] = useState();
  const [api, contextHolder] = notification.useNotification();
  const [dateMatch, setDateMatch] = useState({});
  const [listData, setListData] = useState([]);
  const [form] = Form.useForm();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [timeServer, setTimeServer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [IP, setIP] = useState(null);
  const [FP, setFP] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      //get ip, fp
      const ip = await getIP();
      const fp = await getFP();
      setIP(ip?.data);
      setFP(fp?.data);

      //get time server
      const timeServer = await getCurrentTimeMS();
      setTimeServer(timeServer);

      const today = moment(timeServer).format("MM/DD/YYYY");
      //handel get match by date
      const resData = await matchByDate({ date: today });

      const _listData =
        resData.data &&
        resData.data.map((item, index) => {
          const formatCountDown = moment(
            `${item.local_date} ${item.local_time}`,
            "MM/DD/YYYY HH:mm:ss"
          ).toDate();
          return { data: item, countdown: new Date(formatCountDown) };
        });
      setListData(_listData || []);

      //handel set date
      const itemToday = dt_date.filter((item) => item.date === today);
      setDateMatch(itemToday[0]);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (mySwiper !== undefined && !mySwiper.destroyed) {
      const fetchData = async () => {
        setLoading(true);
        const timeServer = await getCurrentTimeMS();
        const today = moment(timeServer).format("MM/DD/YYYY");
        const itemToday = dt_date.filter((item) => item.date === today);
        if (mySwiper !== undefined && !mySwiper.destroyed) {
          mySwiper.slideTo(itemToday[0]._id - 1);
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [mySwiper]);

  const handleClickDate = async (date, index) => {
    if (date === dateMatch.date) return;
    setLoading(true);
    form.resetFields();

    const itemClicked = dt_date.filter((item) => item.date === date);
    mySwiper.slideTo(index);
    const resData = await matchByDate({ date: date });

    const _listData =
      resData.data &&
      resData.data.map((item, i) => {
        const formatCountDown = moment(
          `${item.local_date} ${item.local_time}`,
          "MM/DD/YYYY HH:mm:ss"
        ).toDate();
        return { data: item, countdown: new Date(formatCountDown) };
      });

    setListData(_listData || []);
    setDateMatch(itemClicked[0]);
    setLoading(false);
  };

  const handleSlideChange = async (swiper) => {
    form.resetFields();
    const activeIndex = swiper.activeIndex;
    const item = dt_date.filter((item) => item._id - 1 === activeIndex);

    if (dateMatch.date === item[0].date) return;

    setLoading(true);
    const resData = await matchByDate({ date: item[0].date });
    const _listData =
      resData.data &&
      resData.data.map((item, i) => {
        const formatCountDown = moment(
          `${item.local_date} ${item.local_time}`,
          "MM/DD/YYYY HH:mm:ss"
        ).toDate();
        return { data: item, countdown: new Date(formatCountDown) };
      });

    setListData(_listData || []);
    setDateMatch(item[0]);
    setLoading(false);
  };

  const onFinishCountDown = () => {
    console.log("finished!");
  };

  const onFinish = async (data) => {
    setLoadingSubmit(true);
    if (
      data.team1score === undefined &&
      data.team2score === undefined &&
      data.team3score === undefined &&
      data.team4score === undefined &&
      data.team5score === undefined &&
      data.team6score === undefined &&
      data.team7score === undefined &&
      data.team8score === undefined
    ) {
      setLoadingSubmit(false);
      return api["warning"]({
        message: "Cảnh báo",
        description: "Đã hết giờ dự đoán, vui lòng chọn ngày khác!",
        placement: "center",
      });
    }

    if (listData.length <= 0) {
      setLoadingSubmit(false);
      return api["error"]({
        message: "Lỗi",
        description: "Không có dữ liệu trận đấu, vui lòng chọn ngày khác!",
        placement: "center",
      });
    }

    if (listData.length > 0) {
      data.date = dateMatch.date;
      data.ip = IP;
      data.fp = FP;
      const resData = await postMatch(data);

      console.log(resData);

      if (resData.status !== 200) {
        setLoadingSubmit(false);
        return api["error"]({
          message: "Lỗi",
          description: "Dự đoán tỉ số không thành công",
          placement: "center",
        });
      }

      if (resData.status === 200 && resData.data) {
        if (resData.data.mess && resData.data.mess === "Failed") {
          setLoadingSubmit(false);
          return api["error"]({
            message: "Lỗi",
            description: "Lỗi hệ thống",
            placement: "center",
          });
        }

        if (resData.data.mess && resData.data.mess === "Dupplicate") {
          setLoadingSubmit(false);
          return api["warning"]({
            message: "Cảnh báo",
            description: `Bạn đã dự đoán tỉ số cho ngày ${dateMatch.date}`,
            placement: "center",
          });
        }

        if (resData.status === 200 && resData.data) {
          setLoadingSubmit(false);
          const customNoti = (
            <>
              <p>{`Dự đoán tỉ số ngày ${resData.data.createDate} thành công!`}</p>
              <p>{`Lựa chọn của quý khách:`}</p>
              <p>
                {resData.data.result1?.includes("undefined")
                  ? ""
                  : resData.data.result1}
              </p>
              <p>
                {resData.data.result2?.includes("undefined")
                  ? ""
                  : resData.data.result2}
              </p>
              <p>
                {resData.data.result3?.includes("undefined")
                  ? ""
                  : resData.data.result3}
              </p>
              <p>
                {resData.data.result4?.includes("undefined")
                  ? ""
                  : resData.data.result4}
              </p>
            </>
          );
          return api["success"]({
            message: "Thành công",
            description: customNoti,
            placement: "center",
          });
        }
      }
    }
    setLoadingSubmit(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    api["error"]({
      message: "Lỗi",
      description: "Vui lòng nhập dự đoán của tất cả các trận đấu!",
      placement: "center",
    });
  };

  const showListItemMatch = (matchList) => {
    if (matchList.length <= 0) {
      return <p>Không tìm thấy dữ liệu</p>;
    } else {
      const itemMatch = matchList.map((item, index) => {
        let idTeam = 0;
        if (index === 0) idTeam = index + 1;
        if (index === 1) idTeam = index + 2;
        if (index === 2) idTeam = index + 3;
        if (index === 3) idTeam = index + 4;
        return (
          <div
            className={`item-match ${
              timeServer > item.countdown ? "item-end-time" : ""
            }`}
            key={index}
          >
            <div div className="wc-group">
              {`Bảng ${item.data.group}`}
            </div>
            <div className="wc-time-match">
              <span>
                <ClockCircleOutlined
                  style={{
                    color: "#228B22",
                  }}
                />
              </span>
              <span className="wc-time">
                <Countdown
                  title={`${
                    timeServer > item.countdown ? "Hết giờ" : "Thời gian còn: "
                  }`}
                  value={item.countdown}
                  onFinish={onFinishCountDown}
                />
              </span>
            </div>
            <div className="wc-item-match-detail">
              <div className="wc-home">
                <div className="wc-home-logo">
                  <Avatar src={item.data.home_flag} />
                </div>
                <div className="wc-home-name">{item.data.home_team}</div>
              </div>
              <div className="wc-result">
                <span className="wc-result-home">
                  <Form.Item
                    name={`team${idTeam}score`}
                    rules={[
                      {
                        required: timeServer > item.countdown ? false : true,
                        message: "",
                      },
                    ]}
                  >
                    <InputNumber
                      disabled={timeServer > item.countdown ? true : false}
                    />
                  </Form.Item>
                </span>
                <span>:</span>
                <span className="wc-result-away">
                  <Form.Item
                    name={`team${idTeam + 1}score`}
                    rules={[
                      {
                        required: timeServer > item.countdown ? false : true,
                        message: "",
                      },
                    ]}
                  >
                    <InputNumber
                      disabled={timeServer > item.countdown ? true : false}
                    />
                  </Form.Item>
                </span>
              </div>
              <div className="wc-away">
                <div className="wc-away-name">{item.data.away_team}</div>
                <div className="wc-away-logo">
                  <Avatar src={item.data.away_flag} />
                </div>
              </div>
            </div>
          </div>
        );
      });
      return itemMatch;
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="bet789 wc2022">
      {contextHolder}
      <div
        className="wrapper"
        style={{
          backgroundImage: `url(${bg.src})`,
          width: "100%",
          height: "100%",
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <div className="img-logo">
            <Image src={logo_shbet_wc2022} alt="789BET" />
          </div>
          <div className="box">
            <h1 className="title">CÙNG 789BET DỰ ĐOÁN TỈ SỐ WORLD CUP 2022</h1>

            <div className="box-date">
              <Swiper
                slidesPerView={2}
                spaceBetween={5}
                keyboard={{
                  enabled: true,
                }}
                navigation={true}
                modules={[Keyboard, Navigation]}
                className="sc-slidercon"
                onSwiper={setSwiper}
                onSlideChange={() => handleSlideChange(mySwiper)}
                breakpoints={{
                  // when window width is >= 640px
                  640: {
                    width: 640,
                    slidesPerView: 1,
                  },
                  // when window width is >= 768px
                  768: {
                    width: 768,
                    slidesPerView: 2,
                  },

                  // when window width is >= 768px
                  1024: {
                    width: 1024,
                    slidesPerView: 5,
                  },
                }}
              >
                {dt_date &&
                  dt_date.map((item, index) => {
                    return (
                      <SwiperSlide
                        key={index}
                        virtualIndex={index}
                        onClick={() => handleClickDate(item.date, index)}
                      >
                        <p className="sc-date">
                          {`${item.day}, ${item.text_date}`}
                        </p>
                        <p className="sc-type">{item.type}</p>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
            <Form
              name="formMatch"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              form={form}
            >
              <div className="box-match">
                {loading ? (
                  <div className="loading-spin">
                    <Spin />
                  </div>
                ) : (
                  <div className="list-match">
                    <div className="box-top">
                      <p className="sc-bigdate">{`${dateMatch.day}, ${dateMatch.text_date}`}</p>
                      <div className="box-users">
                        <Form.Item name="playerId">
                          <Input
                            placeholder="Tên đăng nhập!"
                            maxLength={13}
                            prefix={<UserOutlined />}
                          />
                        </Form.Item>

                        <Form.Item>
                          <Button
                            type="primary"
                            className="btn-submit"
                            htmlType="submit"
                            loading={loadingSubmit}
                          >
                            Xác Nhận
                          </Button>
                        </Form.Item>
                      </div>
                    </div>
                    {showListItemMatch(listData)}
                  </div>
                )}
              </div>
            </Form>

            <div className="btn-history">
              <ModalHistory />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BET789;
