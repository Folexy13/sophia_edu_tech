import { Table as AntTable, TableColumnsType, TableProps } from "antd";
import React, { useState } from "react";

type TableRowSelection<T> = TableProps<T>["rowSelection"];

const mapKeyToOptions = (options: any[] = []) => {
	return options.map((option: any, index: number) => ({
		...option,
		key: index + 1,
	}));
};

const Table: React.FC<{
	data?: any[];
	columns?: TableColumnsType<any>;
	rowSelection?: any;
	type?: string;
	pagination?: any;
	className?: string;
	onFilter?: any;
	loading?: boolean;
	onChange?: any;
}> = ({ data = [], columns = [], className = "", rowSelection = {}, type = "default", pagination = {}, loading = false, onChange = () => {} }) => {
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
				dataSource={mapKeyToOptions(data)}
				columns={columns}
				loading={loading}
				className={`customtable ${className}`}
				rowSelection={rowSelection ? rowSelection : section}
				pagination={pagination}
				onChange={onChange}
			/>
		);
	return (
		<AntTable
			dataSource={mapKeyToOptions(data)}
			loading={loading}
			columns={columns}
			className={`customtable ${className}`}
			pagination={pagination}
			onChange={onChange}
		/>
	);
};

export default Table;
