import React, { useState, useEffect } from "react";
import ReactExport from "react-export-excel";
import moment from "moment";
import { Button, DatePicker } from "antd";

import { DownloadOutlined } from "@ant-design/icons";

import {
  getAllDataPrediction,
  getDataPredictionByDate,
} from "../../helpers/helper";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default function DownloadExcel() {
  const [dataSet, setDataSet] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const dt = await getAllDataPrediction();
      var uniqueDate = [...new Set(dt.data?.map((item) => item.createDate))];
      uniqueDate = uniqueDate.sort();
      var arrDataSet = [];
      for (let i = 0; i < uniqueDate.length; i++) {
        var obj = {};
        obj.date = uniqueDate[i];
        obj.data = [];

        for (let j = 0; j < dt.data.length; j++) {
          if (uniqueDate[i] === dt.data[j].createDate) {
            var objData = {};
            objData.playerId = dt.data[j].playerId;
            objData.ip = dt.data[j].ip;
            objData.fp = dt.data[j].fp;
            objData.result1 = dt.data[j].result1;
            objData.result2 = dt.data[j].result2;
            objData.result3 = dt.data[j].result3;
            objData.result4 = dt.data[j].result4;
            obj.data.push(objData);
          }
        }
        arrDataSet.push(obj);
      }

      console.log("arrDataSet: ", arrDataSet);
      setDataSet(arrDataSet);
      setLoading(false);
    };
    fetchData();
  }, []);

  const onChangeDatePicker = async (date, dateString) => {
    setLoading(true);
    const dateReq = moment(dateString).format("MM/DD/YYYY");
    const dt = await getDataPredictionByDate({ date: dateReq });
    var obj = {};
    obj.date = dateReq;
    obj.data = [];

    for (let i = 0; i < dt.data.length; i++) {
      var objData = {};
      objData.playerId = dt.data[i].playerId;
      objData.ip = dt.data[i].ip;
      objData.fp = dt.data[i].fp;
      objData.result1 = dt.data[i].result1;
      objData.result2 = dt.data[i].result2;
      objData.result3 = dt.data[i].result3;
      objData.result4 = dt.data[i].result4;
      obj.data.push(objData);
    }

    setDataSet([obj]);
    setLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DatePicker onChange={onChangeDatePicker} />
      <ExcelFile
        filename="du_lieu_du_doan_ti_so"
        element={
          <Button
            type="primary"
            shape="round"
            icon={<DownloadOutlined />}
            size={"default"}
            loading={loading ? true : false}
          >
            Tải Dữ Liệu
          </Button>
        }
      >
        {dataSet.length > 0 &&
          dataSet.map((item, i) => {
            return (
              <ExcelSheet data={item.data} name={item.date} key={i}>
                <ExcelColumn label="playerId" value="playerId" />
                <ExcelColumn label="ip" value="ip" />
                <ExcelColumn label="fp" value="fp" />
                <ExcelColumn label="result1" value="result1" />
                <ExcelColumn label="result2" value="result2" />
                <ExcelColumn label="result3" value="result3" />
                <ExcelColumn label="result4" value="result4" />
              </ExcelSheet>
            );
          })}
      </ExcelFile>
    </div>
  );
}
