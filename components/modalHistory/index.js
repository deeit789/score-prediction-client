import React, { useState } from "react";
import { Button, Modal, Form, Input, Space, Table } from "antd";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";

import { getPlayerMatchScore } from "../../helpers/helper";

const ModalHistory = (props) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(props.isModalOpen);
  const [dataPlayer, setDataPlayer] = useState([]);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = async (values) => {
    setLoading(true);
    const dataRes = await getPlayerMatchScore({
      playerId: values.username.trim().toLowerCase(),
    });

    const _dataPlayer = dataRes.data?.map((item, index) => {
      return {
        key: item._id,
        date: item.createDate,
        result1: item.result1,
        result2: item.result2,
        result3: item.result3,
        result4: item.result4,
      };
    });

    setDataPlayer(_dataPlayer);
    setLoading(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const columns = [
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
      sorter: true,
    },
    {
      title: "Trận 1",
      dataIndex: "result1",
      key: "result1",
    },
    {
      title: "Trận 2",
      dataIndex: "result2",
      key: "result2",
    },
    {
      title: "Trận 3",
      dataIndex: "result3",
      key: "result3",
    },
    {
      title: "Trận 4",
      dataIndex: "result4",
      key: "result4",
    },
  ];

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Xem lịch sử dự đoán
      </Button>
      <Modal
        title="Xem lịch sử dự đoán"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={1000}
        wrapClassName="modalHistory"
      >
        <Form
          name="formHistory"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{ marginTop: 20 }}
        >
          <Space.Compact
            block
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên đăng nhập!",
                },
              ]}
            >
              <Input placeholder="Tên đăng nhập" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                htmlType="submit"
                loading={loading ? true : false}
              >
                Xem lịch sử
              </Button>
            </Form.Item>
          </Space.Compact>
        </Form>

        <Table dataSource={dataPlayer} columns={columns} />
      </Modal>
    </>
  );
};
export default ModalHistory;
