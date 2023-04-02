import "./home.scss";
import Inventory from "../inventory/inventory.jsx";
import homeLogo from "../../images/home-logo.png";
import cornerImg from "../../images/corner.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  setDoc,
  doc,
} from "firebase/firestore";

import { signOut } from "firebase/auth";
import { db, auth } from "../firebase/firebase-config.js";

const Home = () => {
  const [inventory, setInventory] = useState([]);
  // const inventoryCollectionRef = collection(db, "inventory");

  const user = auth.currentUser;
  const inventoryCollectionRef = user
    ? collection(db, `users/${user.uid}/inventory`)
    : null;

  const [newLocation, setNewLocation] = useState("");
  const [newItem, setNewItem] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editLocation, setEditLocation] = useState("");
  const [editItem, setEditItem] = useState("");
  const [editInventoryId, setEditInventoryId] = useState("");

  // useEffect(() => {
  //   const getInventory = async () => {
  //     const data = await getDocs(inventoryCollectionRef);
  //     setInventory(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };

  //   getInventory();
  // }, [inventoryCollectionRef]);

  // Retrieve user-specific todos
  useEffect(() => {
    const getInventory = async () => {
      if (inventoryCollectionRef) {
        const data = await getDocs(inventoryCollectionRef);
        setInventory(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    };

    getInventory();
  }, [inventoryCollectionRef]);

  const createInventory = async (event) => {
    event.preventDefault();

    if (newLocation === "" && newItem <= 0) {
      alert("Please enter a valid item and location");
    } else if (newLocation === "") {
      alert("Please enter a valid item");
    } else if (newItem <= 0) {
      alert("Please enter a valid location");
    } else {
      await addDoc(inventoryCollectionRef, {
        location: newLocation,
        item: newItem,
      });
      const data = await getDocs(inventoryCollectionRef);
      setInventory(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    // setNewLocation("");
    // setNewItem("");
  };

  const deleteInventory = async (id) => {
    const inventoryDoc = doc(inventoryCollectionRef, id);
    await deleteDoc(inventoryDoc);
    const data = await getDocs(inventoryCollectionRef);
    setInventory(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleEdit = (inventory) => {
    setIsEditing(true);
    setEditLocation(inventory.location);
    setEditItem(inventory.item);
    setEditInventoryId(inventory.id);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    if (editLocation === "" && editItem <= 0) {
      alert("Please enter a valid item and location");
    } else if (editLocation === "") {
      alert("Please enter a valid item");
    } else if (editItem <= 0) {
      alert("Please enter a valid location");
    } else {
      const inventoryDoc = doc(inventoryCollectionRef, editInventoryId);
      await setDoc(inventoryDoc, {
        location: editLocation,
        item: editItem,
      });
      const data = await getDocs(inventoryCollectionRef);
      setInventory(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setIsEditing(false);
      setEditLocation("");
      setEditItem("");
      setEditInventoryId("");
    }
  };

  const navigate = useNavigate();

  const signout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="home">
      <nav>
        <img src={cornerImg} alt="corner image" />
        <img src={homeLogo} alt="home logo" />
        <button onClick={signout}>Sign Out</button>
      </nav>

      <div className="main-form">
        <form>
          <input
            maxlength="40"
            placeholder="Enter Item"
            value={newItem}
            onChange={(event) => {
              setNewItem(event.target.value);
            }}
          />
          <input
            maxlength="40"
            placeholder="Enter Location"
            value={newLocation}
            onChange={(event) => {
              setNewLocation(event.target.value);
            }}
          />

          <button type="submit" onClick={createInventory}>
            Add
          </button>
        </form>
        <img src={cornerImg} alt="corner image" />
      </div>

      <div className="inventory">
        {inventory.map((inventory) => {
          return (
            <div key={inventory.id}>
              {isEditing && editInventoryId === inventory.id ? (
                <form onSubmit={handleEditSubmit}>
                  <div className="edit-inventory">
                    <div className="edit-inventory-inputs">
                      <input
                        maxlength="40"
                        placeholder="New Item"
                        value={editItem}
                        onChange={(event) => {
                          setEditItem(event.target.value);
                        }}
                      />
                      <input
                        maxlength="40"
                        placeholder="New Location"
                        value={editLocation}
                        onChange={(event) => {
                          setEditLocation(event.target.value);
                        }}
                      />
                    </div>

                    <div className="edit-inventory-btns">
                      <button type="submit">Save</button>
                      <button onClick={() => setIsEditing(false)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <Inventory
                  inventory={inventory}
                  handleEdit={handleEdit}
                  deleteInventory={deleteInventory}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
