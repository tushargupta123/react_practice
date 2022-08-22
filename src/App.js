import './App.css';
import React, { useState, useEffect, useMemo, useRef, createContext } from 'react';
import User from './User';
import User1 from './User1';
import Child from './Child';
import OtherChild from './OtherChild';

export const GlobalInfo = createContext();

function App() {

  const [color, setColor] = useState('red');

  function getDay(day) {
    console.log(day)
  }

  const [count, setCount] = useState(0);
  const [data, setData] = useState(100);

  let inputRef = useRef(null);
  let inputRef1 = useRef(null);

  function handleInput() {
    inputRef.current.value = "100"
    inputRef.current.focus();
  }

  function updateInput() {
    inputRef1.current.value = "1000"
  }

  useEffect(() => {
    console.log("count is " + count);
  }, [count]);            // [count] => this is the parameter of useEffect => this useEffect is called only when count is changed.
  useEffect(() => {
    console.log("data is " + data);
  }, [data]);
  const students = ["tushar", "devansh", "akg", "anubahav"];

  let data1 = "tushar gupta";

  function parentAlert(item) {
    alert(item);
  };

  const [count1, setCount1] = useState(0);
  const [item, setItem] = useState(10);

  const multiCountMemo = useMemo(function multiCount() {
    console.log("multiCount");
    return count1 * 5;
  }, [count1]);       // this function will be called only when count1 is triggered.

  // GET METHOD FOR API 
  useEffect(() => {
    getUser();
  }, []);     // [] is used so that useEffect is called only once.

  function getUser() {
    fetch("url").then((result) => {
      result.json().then((res) => {
        console.log("result", res);
      })
    })
  };

  // POST METHOD FOR API
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [userId, setUserId] = useState(0);

  function saveUser() {
    console.log({ name, email, mobile });
    let data = { name, email, mobile };

    fetch("url", {
      method: "POST",
      headers: {
        'Accept': "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((result) => {
      console.log(result);
      result.json().then((res) => {
        console.log(res);
      })
    })
  };

  // DELETE METHOD FOR API
  function deleteUser() {
    fetch("url", {
      method: "DELETE"
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp);
        getUser();
      })
    })
  };

  // PUT METHOD FOR API
  function deleteUser() {
    let item = { name, email, mobile, userId }
    fetch("url", {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp);
        getUser();
      })
    })
  };

  // Previous state
  const [count2, setCount2] = useState(1);
  function updateCounter() {
    let rand = Math.floor(Math.random() * 10);
    setCount2((pre) => {
      console.log(pre);
      return rand;
    });
  };

  // State with Object
  const [data2, setData2] = useState({ name: "tushar", age: 19 });


  return (
    <div>
      <h1>USE EFFECT</h1>
      <p>Count is : {count}</p>
      <p>data is : {data}</p>
      <button onClick={() => setCount(count + 1)}>incerase count</button>
      <button onClick={() => setData(data + 1)}>incerase data</button>

      <h1>ARRAY</h1>
      {
        students.map((item) =>
          <p>my name is : {item}</p>
        )
      }

      <h1>Lifting state up</h1>
      <User name={data1} alert={parentAlert} />

      <h1>Use memo</h1>
      {/* save us from calling unwanted function */}
      <h2>Count 1 : {count1}</h2>
      <h2>Item: {item}</h2>
      <h2>{multiCountMemo}</h2>
      <button onClick={() => setCount1(count1 + 1)}>Update Count 1</button>
      <button onClick={() => setItem(item * 10)}>Update item</button>

      <h1>UseRef in React</h1>
      {/* used for changing properties of any element in DOM. */}
      <input type="text" ref={inputRef} />
      <button onClick={handleInput}>Handle Input</button>

      <h1>ForwarRef in React</h1>
      {/* used for changing DOM in child component */}
      <User1 ref={inputRef1} />
      <button onClick={updateInput}>Update inputBox</button>

      <h1>HOC</h1>
      {/* it takes component as input and give manipulated component as output */}
      <HOCRed cmp={Counter} />
      <HOCGreen cmp={Counter} />

      <h1>POST API </h1>
      <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} name="name" /><br />
      <input type="text" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} /><br />
      <input type="text" name="mobile" value={mobile} onChange={(e) => { setMobile(e.target.value) }} /><br />
      <button type="button" onClick={saveUser}>Save new User</button><br />

      <h1>Previous state</h1>
      <p>{count2}</p>
      <button onClick={updateCounter} >Click me to update counter</button>

      <h1>State object with hooks</h1>

      {/* <input type="text" placeholder='Enter name' value={data2.name}
       onChange={(e)=> {setData2({name:e.target.value})}}/>
      <input type="text" placeholder='Enter age' value={data2.age}
       onChange={(e)=> {setData2({age:e.target.value})}}/> */}
      {/* PROBLEM ENCOUNTERED: 
      on change data2 assumes that the state has only one element and second element is not shown. */}

      <input type="text" placeholder='Enter name' value={data2.name}
        onChange={(e) => { setData2({ name: e.target.value, age: data2.age }) }} />
      <input type="text" placeholder='Enter age' value={data2.age}
        onChange={(e) => { setData2({ name: data2.name, age: e.target.value }) }} />
      <h3>{data2.name}</h3>
      <h3>{data2.age}</h3>

      <GlobalInfo.Provider value={{appColor : color, getDay: getDay}}>
      <h1>Context API</h1>
      <Child/>
      <OtherChild/>
      </GlobalInfo.Provider>

    </div>
  );
}

function HOCRed(props) {
  return (
    <div>
      <h2 style={{ backgroundColor: "red", width: 100 }} ><props.cmp /></h2>
    </div>
  )
}

function HOCGreen(props) {
  return (
    <div>
      <h2 style={{ backgroundColor: "green", width: 100 }} ><props.cmp /></h2>
    </div>
  )
}

function Counter() {

  const [count, setCount] = useState(0);

  return (
    <div>
      <h3>{count}</h3>
      <button onClick={() => setCount(count + 1)}>Update</button>
    </div>
  );
}

export default App;
