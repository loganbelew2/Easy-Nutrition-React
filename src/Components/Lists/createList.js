import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./list.css"
export const CreateList = () => {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState("")
  const [selectedCategory, setCategory] = useState(0)
  const [formError, setFormError] = useState(false)
  
  const navigate = useNavigate()
  const localEasyUser = localStorage.getItem("easy_user")
  const EasyUserObject = JSON.parse(localEasyUser)

  useEffect(() => {
    fetch("http://localhost:8088/categories")
      .then(response => response.json())
      .then(data => setCategories(data))
  }, [])

  const createNewList = (e) => {
    e.preventDefault()

    // Check if the required fields are filled out
    if (name.trim() === "" || selectedCategory === 0) {
      setFormError(true)
      return
    }

    const list = {
      name: name,
      categoryId: parseInt(selectedCategory),
      userId: EasyUserObject.id
    }

    fetch("http://localhost:8088/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(list)
    }).then(navigate("/searchFood")
    )
  }

  return (
    <>
      <form name="createList">
        <h2 className="createList--header">Create Your List</h2>

        <fieldset>
          <label className="name--label" htmlFor="names">Name of List</label>
          <input id="names" value={name} onChange={(evt) => setName(evt.target.value)} required type="text"/>

          <select className="category--select" required onChange={(evt) => setCategory(evt.target.value)}>
            <option value={0}>Select a category</option>
            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
        </fieldset>
        

        {formError && <p>Please fill out all fields.</p>}

        <button onClick={createNewList}>Create</button>
      </form>
    </>
  )
}
