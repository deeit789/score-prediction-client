import React, { useState } from "react";
import { Button, Form, Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { getPlayerMatchScore } from "../../helpers/helper";

import DownloadExcel from "../dowload-excel";

function CheckData() {
  const [dataPlayer, setDataPlayer] = useState([]);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    console.log("Success:", values);
    const dataRes = await getPlayerMatchScore({
      playerId: values.username.trim().toLowerCase(),
    });

    const _dataPlayer = dataRes.data?.map((item, index) => {
      return {
        key: item._id,
        playerId: item.playerId,
        date: item.createDate,
        result1: item.result1,
        result2: item.result2,
        result3: item.result3,
        result4: item.result4,
        ip: item.ip,
        fp: item.fp,
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
      title: "playerId",
      dataIndex: "playerId",
      key: "playerId",
    },
    {
      title: "date",
      dataIndex: "date",
      key: "date",
      sorter: true,
    },
    {
      title: "result1",
      dataIndex: "result1",
      key: "result1",
    },
    {
      title: "result2",
      dataIndex: "result2",
      key: "result2",
    },
    {
      title: "result3",
      dataIndex: "result3",
      key: "result3",
    },
    {
      title: "result4",
      dataIndex: "result4",
      key: "result4",
    },
    {
      title: "ip",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: "fp",
      dataIndex: "fp",
      key: "fp",
    },
  ];

  return (
    <div className="wrapper">
      <div className="container" style={{ marginTop: 20 }}>
        <DownloadExcel />
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{ marginTop: 20 }}
        >
          <Space
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                htmlType="submit"
                loading={loading ? true : false}
              >
                Search
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </div>
      <div className="container" style={{ marginTop: 20 }}>
        <Table dataSource={dataPlayer} columns={columns} />
      </div>
    </div>
  );
}

export default CheckData;
