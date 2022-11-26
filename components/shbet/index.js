import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from "swiper/react";
import {
  InputNumber,
  Input,
  Avatar,
  Statistic,
  Button,
  notification,
  Form,
} from "antd";
import { ClockCircleOutlined, UserOutlined } from "@ant-design/icons";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Keyboard, Navigation, Pagination } from "swiper";
import moment from "moment";

import { matchByDate, getTimeSystem, postMatch } from "../../helpers/helper";

import logo_shbet_wc2022 from "../../assets/images/shbet/logo-shbet-wc.png";
import sticker_wc2022 from "../../assets/images/shbet/wc2022-1.png";
import gif_wc2022 from "../../assets/images/shbet/wc2022.gif";

const { Countdown } = Statistic;
const dt_date = [
  {
    _id: "1",
    day: "CHỦ NHẬT",
    date: "11/20/2022",
    text_date: "20 THÁNG 11 2022",
    type: "VÒNG BẢNG",
  },
  {
    _id: "2",
    day: "Thứ Hai",
    date: "11/21/2022",
    text_date: "21 Tháng 11 2022",
    type: "VÒNG BẢNG",
  },
  {
    _id: "3",
    day: "Thứ Ba",
    date: "11/22/2022",
    text_date: "22 THÁNG 11 2022",
    type: "VÒNG BẢNG",
  },
  {
    _id: "4",
    day: "Thứ Tư",
    date: "11/23/2022",
    text_date: "23 THÁNG 11 2022",
    type: "VÒNG BẢNG",
  },
  {
    _id: "5",
    day: "Thứ Năm",
    date: "11/24/2022",
    text_date: "24 THÁNG 11 2022",
    type: "VÒNG BẢNG",
  },
  {
    _id: "6",
    day: "Thứ Sáu",
    date: "11/25/2022",
    text_date: "25 THÁNG 11 2022",
    type: "VÒNG BẢNG",
  },
  {
    _id: "7",
    day: "Thứ Bảy",
    date: "11/26/2022",
    text_date: "26 THÁNG 11 2022",
    type: "VÒNG BẢNG",
  },
  {
    _id: "8",
    day: "Chủ Nhật",
    date: "11/27/2022",
    text_date: "27 THÁNG 11 2022",
    type: "VÒNG BẢNG",
  },
  {
    _id: "9",
    day: "Thứ Hai",
    date: "11/28/2022",
    text_date: "28 THÁNG 11 2022",
    type: "VÒNG BẢNG",
  },
  {
    _id: "10",
    day: "Thứ Ba",
    date: "11/29/2022",
    text_date: "29 THÁNG 11 2022",
    type: "VÒNG BẢNG",
  },
  {
    _id: "11",
    day: "Thứ Tư",
    date: "11/30/2022",
    text_date: "30 THÁNG 11 2022",
    type: "VÒNG BẢNG",
  },
  {
    _id: "12",
    day: "Thứ Năm",
    date: "12/01/2022",
    text_date: "1 THÁNG 12 2022",
    type: "VÒNG BẢNG",
  },
  {
    _id: "13",
    day: "Thứ Sáu",
    date: "12/02/2022",
    text_date: "2 THÁNG 12 2022",
    type: "VÒNG BẢNG",
  },
  {
    _id: "14",
    day: "Thứ Bảy",
    date: "12/03/2022",
    text_date: "3 THÁNG 12 2022",
    type: "VÒNG BẢNG",
  },
  {
    _id: "15",
    day: "Chủ Nhật",
    date: "12/04/2022",
    text_date: "4 THÁNG 12 2022",
    type: "VÒNG 16",
  },
  {
    _id: "16",
    day: "Thứ Hai",
    date: "12/05/2022",
    text_date: "5 THÁNG 12 2022",
    type: "VÒNG 16",
  },
  {
    _id: "17",
    day: "Thứ Ba",
    date: "12/06/2022",
    text_date: "6 THÁNG 12 2022",
    type: "VÒNG 16",
  },
  {
    _id: "18",
    day: "Thứ Tư",
    date: "12/07/2022",
    text_date: "7 THÁNG 12 2022",
    type: "VÒNG 16",
  },
  {
    _id: "19",
    day: "Thứ Sáu",
    date: "12/09/2022",
    text_date: "9 THÁNG 12 2022",
    type: "TỨ KẾT",
  },
  {
    _id: "20",
    day: "Thứ Bảy",
    date: "12/10/2022",
    text_date: "10 THÁNG 12 2022",
    type: "TỨ KẾT",
  },
  {
    _id: "21",
    day: "Thứ Hai",
    date: "12/11/2022",
    text_date: "11 THÁNG 12 2022",
    type: "TỨ KẾT",
  },
  {
    _id: "22",
    day: "Thứ Tư",
    date: "12/14/2022",
    text_date: "14 THÁNG 12 2022",
    type: "TỨ KẾT",
  },
  {
    _id: "23",
    day: "Thứ Năm",
    date: "12/15/2022",
    text_date: "15 THÁNG 12 2022",
    type: "TỨ KẾT",
  },
  {
    _id: "24",
    day: "Thứ Bảy",
    date: "12/17/2022",
    text_date: "17 THÁNG 12 2022",
    type: "TRANH HẠNG 3",
  },
  {
    _id: "25",
    day: "CHỦ NHẬT",
    date: "12/18/2022",
    text_date: "18 THÁNG 12 2022",
    type: "CHUNG KẾT",
  },
];

const getCurrentTimeMS = async () => {
  const time = await getTimeSystem();
  return time.data.servertime || null;
};

function SHBET() {
  const [mySwiper, setSwiper] = useState();
  const [api, contextHolder] = notification.useNotification();
  const [dateMatch, setDateMatch] = useState({});
  const [listData, setListData] = useState([]);
  const [form] = Form.useForm();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [timeServer, setTimeServer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const timeServer = await getCurrentTimeMS();
      const today = moment(timeServer).format("MM/DD/YYYY");
      const itemToday = dt_date.filter((item) => item.date === today);
      if (mySwiper !== undefined && !mySwiper.destroyed) {
        mySwiper.slideTo(itemToday[0]._id - 1);
      }
    };
    fetchData();
  }, [mySwiper]);

  const handleClickDate = async (date, index) => {
    if (date === dateMatch.date) return;

    console.log("handleClickDate");
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
  };

  const handleSlideChange = async (swiper) => {
    console.log("handleSlideChange");
    form.resetFields();
    const activeIndex = swiper.activeIndex;
    const item = dt_date.filter((item) => item._id - 1 === activeIndex);

    if (dateMatch.date === item[0].date) return;

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
  };

  const onFinishCountDown = () => {
    console.log("finished!");
  };

  const onChange = (val) => {
    if (4.95 * 1000 < val && val < 5 * 1000) {
      console.log("changed!");
    }
  };

  const onFinish = async (data) => {
    setLoadingSubmit(true);
    if (listData.length <= 0) {
      api["error"]({
        message: "Lỗi",
        description: "Không có dữ liệu trận đấu, vui lòng chọn ngày khác!",
      });
      setLoadingSubmit(false);
      return;
    }

    if (!data.playerId) {
      api["error"]({
        message: "Lỗi",
        description: "Vui lòng nhập đầy đủ và chính xác tên đăng nhập!",
      });
      setLoadingSubmit(false);
      return;
    }

    if (listData.length > 0) {
      // var tmp = 0;
      // Object.keys(data).map((keyName, i) => {
      //   if (!data[keyName]) {
      //     tmp = 1;
      //   }
      // });

      // if (tmp === 1) {
      //   setLoadingSubmit(false);
      //   return api["error"]({
      //     message: "Lỗi",
      //     description: "Vui lòng nhập dự đoán của tất cả các trận đấu!",
      //   });
      // }

      data.date = dateMatch.date;
      const resData = await postMatch(data);
      if (resData.status !== 200) {
        setLoadingSubmit(false);
        return api["error"]({
          message: "Lỗi",
          description: "Dự đoán tỉ số không thành công",
        });
      }

      if (resData.status === 200 && resData.data) {
        if (resData.data.mess && resData.data.mess === "Dupplicate")
          api["warning"]({
            message: "Cảnh báo",
            description: `Bạn đã dự đoán tỉ số cho ngày ${dateMatch.date}`,
          });
        else
          api["success"]({
            message: "Thành công",
            description: `Dự đoán tỉ số ngày ${resData.data.createDate} thành công!`,
          });
        setLoadingSubmit(false);
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    api["error"]({
      message: "Lỗi",
      description: "Vui lòng nhập dự đoán của tất cả các trận đấu!",
    });
  };

  return (
    <div className="shbet">
      {contextHolder}
      <video autoPlay muted loop id="video-bg">
        <source src="/videos/worldcup2022.mp4" type="video/mp4" />
      </video>
      <div className="sticker-wc2022-1">
        <Image src={sticker_wc2022} alt="shbet" />
      </div>
      <div className="sticker-wc2022-2">
        <Image src={gif_wc2022} alt="shbet" />
      </div>
      <div className="wrapper">
        <div className="container">
          <div className="img-logo">
            <Image src={logo_shbet_wc2022} alt="shbet" />
          </div>
          <div className="box">
            <h1 className="title">CÙNG SHBET DỰ ĐOÁN TỈ SỐ WORLD CUP 2022</h1>

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
                <div className="list-match">
                  <div className="box-top">
                    <p className="sc-bigdate">{`${dateMatch.day}, ${dateMatch.text_date}`}</p>
                    <div className="box-users">
                      <Form.Item name="playerId">
                        <Input
                          placeholder="Vui lòng nhập chính xác tên đăng nhập"
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

                  {listData && listData.length > 0
                    ? listData.map((item, index) => {
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
                                    timeServer > item.countdown
                                      ? "Hết giờ"
                                      : "Thời gian còn: "
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
                                <div className="wc-home-name">
                                  {item.data.home_team}
                                </div>
                              </div>
                              <div className="wc-result">
                                <span className="wc-result-home">
                                  <Form.Item
                                    name={`team${idTeam}score`}
                                    rules={[
                                      {
                                        required:
                                          timeServer > item.countdown
                                            ? false
                                            : true,
                                        message: "",
                                      },
                                    ]}
                                  >
                                    <InputNumber
                                      disabled={
                                        timeServer > item.countdown
                                          ? true
                                          : false
                                      }
                                    />
                                  </Form.Item>
                                </span>
                                <span>:</span>
                                <span className="wc-result-away">
                                  <Form.Item
                                    name={`team${idTeam + 1}score`}
                                    rules={[
                                      {
                                        required:
                                          timeServer > item.countdown
                                            ? false
                                            : true,
                                        message: "",
                                      },
                                    ]}
                                  >
                                    <InputNumber
                                      disabled={
                                        timeServer > item.countdown
                                          ? true
                                          : false
                                      }
                                    />
                                  </Form.Item>
                                </span>
                              </div>
                              <div className="wc-away">
                                <div className="wc-away-name">
                                  {item.data.away_team}
                                </div>
                                <div className="wc-away-logo">
                                  <Avatar src={item.data.away_flag} />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    : "Không tìm thấy dữ liệu"}
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SHBET;
