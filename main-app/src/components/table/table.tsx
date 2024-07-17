import { Table as AntTable, TableColumnsType, TableProps } from "antd";
import React, { useState } from "react";

type TableRowSelection<T> = TableProps<T>["rowSelection"];

const columns: TableColumnsType<any> = [
	{
		title: "Name",
		dataIndex: "name",
	},
	{
		title: "Age",
		dataIndex: "age",
	},
	{
		title: "Address",
		dataIndex: "address",
	},
];

const data: any[] = [];
for (let i = 0; i < 46; i++) {
	data.push({
		key: i,
		name: `Edward King ${i}`,
		age: 32,
		address: `London, Park Lane no. ${i}`,
	});
}
const Table: React.FC<{
	data?: any;
	columns?: any;
	rowSelection?: any;
	type?: any;
	className?: string;
}> = ({ data, columns, className, rowSelection, type }) => {
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		console.log("selectedRowKeys changed: ", newSelectedRowKeys);
		setSelectedRowKeys(newSelectedRowKeys);
	};
	const section: TableRowSelection<any> = {
		selectedRowKeys,
		onChange: onSelectChange,
		selections: [
			// Table.SELECTION_ALL,
			// Table.SELECTION_INVERT,
			// Table.SELECTION_NONE,
			{
				key: "odd",
				text: "Select Odd Row",
				onSelect: (changeableRowKeys) => {
					let newSelectedRowKeys = [];
					newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
						if (index % 2 !== 0) {
							return false;
						}
						return true;
					});
					setSelectedRowKeys(newSelectedRowKeys);
				},
			},
			{
				key: "even",
				text: "Select Even Row",
				onSelect: (changeableRowKeys) => {
					let newSelectedRowKeys = [];
					newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
						if (index % 2 !== 0) {
							return true;
						}
						return false;
					});
					setSelectedRowKeys(newSelectedRowKeys);
				},
			},
		],
	};
	if (type === "selection")
		return (
			<AntTable
				dataSource={data}
				columns={columns}
				className={`customtable ${className}`}
				rowSelection={rowSelection ? rowSelection : section}
			/>
		);
	return <AntTable dataSource={data} columns={columns} className={className} />;
};

Table.defaultProps = {
	data,
	columns,
	rowSelection: {},
	type: "default",
};
export default Table;
