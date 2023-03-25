import "./inventory.scss";

const Inventory = (props) => {
  const inventory = props.inventory;
  const handleEdit = props.handleEdit;
  const deleteInventory = props.deleteInventory;
  return (
    <div className="inventory-container">
      <div className="inventory-outputs">
        <div className="item">{inventory.item}</div>
        <div className="location">{inventory.location}</div>
      </div>
      <div className="inventory-btns">
        <button onClick={() => handleEdit(inventory)} className="edit-btn">
          <i className="fa-solid fa-pencil"></i>
        </button>
        <button
          onClick={() => deleteInventory(inventory.id)}
          className="delete-btn"
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default Inventory;
