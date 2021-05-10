import React from "react";

export const ListGroup = (props) => {
	const {
		items,
		textProperty,
		valueProperty,
		selectedItem,
		onItemSelect,
	} = props;

	return (
		<ul className="list-group">
			{items.map((item) => (
				<li
					key={item[valueProperty]}
					onClick={() => onItemSelect(item)}
					className={
						selectedItem === item ? "list-group-item active" : "list-group-item"
					}
				>
					{item[textProperty]}
				</li>
			))}
		</ul>
	);
};

ListGroup.defaultProps = {
	textProperty: "name",
	valueProperty: "_id",
};
