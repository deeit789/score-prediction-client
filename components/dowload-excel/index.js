import React, { useState, useEffect } from "react";
import ReactExport from "react-export-excel";

import { getAllDataPrediction } from "../../helpers/helper";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default function DownloadExcel() {
  const [dataSet, setDataSet] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
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
    };
    fetchData();
  }, []);

  const hanleExportExcel = () => {};

  return (
    <ExcelFile filename="Du_lieu_du_doan_ti_so">
      {dataSet.length > 0 &&
        dataSet.map((item, i) => {
          return (
            <ExcelSheet data={item.data} name={item.date} key={i}>
              <ExcelColumn label="playerId" value="playerId" />
              <ExcelColumn label="result1" value="result1" />
              <ExcelColumn label="result2" value="result2" />
              <ExcelColumn label="result3" value="result3" />
              <ExcelColumn label="result4" value="result4" />
            </ExcelSheet>
          );
        })}
    </ExcelFile>
  );
}
