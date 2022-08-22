function User(props){

    const data = "tushar gupta";

    return(
        <div>
            <h2>User name : {props.name} </h2>
            <button onClick={() => props.alert(data)}>Click me</button>
            <input type="text"/>
        </div>
    )
}

export default User;