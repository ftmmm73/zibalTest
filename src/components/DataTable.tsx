import React, { useRef, useState } from "react";
import { Button, Input, Table, Tag } from "antd";
import { dataSource } from "../common/data-table";
import { Search } from "react-feather";
import MainModal from "./MainModal.tsx";
import FormGenerator from "./FormGenerator.tsx";
import { formatDecimal } from "../common/helper";

interface DataType {
  key: React.Key;
  trackId: number;
  status: boolean;
  paidAt: number;
  amount: number;
  cardNumber: string;
}

interface IDialog {
  isOpen: boolean;
  amount?: number;
}

const DataTable: React.FC = () => {
  const searchInput = useRef(null);
  const [invoiceDialog, setInvoiceDialog] = useState<IDialog>({
    isOpen: false,
    amount: 0,
  });

  const columns = [
    {
      title: "شماره تراکنش",
      dataIndex: "trackId",
      key: "trackId",
      onFilter: (value, record) => {
        return record["trackId"]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div
          style={{
            padding: 8,
          }}
          onKeyDown={(e) => e.stopPropagation()}>
          <Input
            ref={searchInput}
            placeholder="شماره تراکنش را وارد کنید ..."
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={confirm}
            style={{
              marginBottom: 2,
              display: "block",
            }}
          />
        </div>
      ),
      filterIcon: () => (
        <Search
          style={{
            color: "#1677ff",
          }}
        />
      ),
    },
    {
      title: "وضعیت تراکنش",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (val) => (
        <Tag color={val ? "green" : "volcano"}>
          {val ? "تراکنش موفق" : "تراکنش ناموفق"}
        </Tag>
      ),
    },
    {
      title: "تاریخ پرداخت",
      dataIndex: "paidAt",
      key: "paidAt",
    },
    {
      title: "مبلغ",
      dataIndex: "amount",
      key: "amount",
      render: (val) => `${formatDecimal(val)} ریال`,
    },
    {
      title: "شماره کارت",
      dataIndex: "cardNumber",
      key: "cardNumber",
    },
    {
      title: "",
      dataIndex: "amount",
      key: "button",
      align: "center",
      render: (val) => {
        return (
          <Button
            type="primary"
            onClick={() => setInvoiceDialog({ isOpen: true, amount: val })}>
            تسویه
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        pagination={false}
        className="table-wrapper"
        footer={(params) => <div>تعداد نتایج : {params.length}</div>}
      />
      {invoiceDialog.isOpen && (
        <MainModal
          isOpen={invoiceDialog.isOpen}
          onClose={() => setInvoiceDialog({ isOpen: false })}
          onSubmit={() => {}}
          title="تسویه کیف پول"
          content={
            <>
              <div className="inventory">
                موجودی کیف پول :{" "}
                <span>{formatDecimal(invoiceDialog.amount)} ریال</span>
              </div>
              <FormGenerator />
            </>
          }
        />
      )}
    </>
  );
};

export default DataTable;
