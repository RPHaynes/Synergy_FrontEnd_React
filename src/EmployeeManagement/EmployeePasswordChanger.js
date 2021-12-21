import React, {useState} from "react";
import { Link } from "react-router-dom";
import { 
	Button, 
	Container,
	Row,
	Col,
	Form,
	FloatingLabel,
	Alert
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Endpoint from "../Endpoint";
import parseJWT from "../parseJWT";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EmployeePasswordChanger({JWT}){

	// Updating employeeInfo
	const [employeeInput, setEmployeeInput] = useState({
		username:'',
		new:'',
		old:''
	});

	const [error, setError] = useState(false);
	const [success, setSucccess] = useState(false);

	let axiosConfig = {headers: {"Content-Type":"application/json", "Authorization":"Bearer " + JWT}};

	const changePassword = (e) => {
		e.preventDefault();
		setEmployeeInput({ ...employeeInput, [e.target.name]: e.target.value });
	}

	let navigate = useNavigate();

	const submitPassword= async (e) => {
		console.log('submited');
		console.log(employeeInput);
		e.preventDefault();
		try{
			//axios put call
			var uID = parseJWT(JWT).ID;
			const response = await axios.put(Endpoint + "/employee/" + uID, employeeInput, axiosConfig);
			console.log(response);
			if(response.status === 200){
				setSucccess(true);
				toast.success("Password Changed!");
				new Promise(() => {
					setTimeout(() => {
						navigate("/employee");
					}, 2200);
				});
			} else {
				setError(true)
			}
		} catch(e){
			console.log(e);
			setError(true)
		}

	}

	return(
		<>
			<br/><br/><br/>
			<Container>
				<Row>
					<Col></Col>
					<Col md="auto" className = "text-center">
						<Form onSubmit={(e) => submitPassword(e)}>
							<FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
								<Form.Control name="username" placeholder="Username" value={employeeInput.username} onChange={(e)=> changePassword(e)} required/>
							</FloatingLabel>
							<FloatingLabel controlId="floatingPasswordOld" label="Old Password" className="mb-3">
								<Form.Control name="old" type="password" placeholder="Old Password" value={employeeInput.old} onChange={(e)=> changePassword(e)} required/>
							</FloatingLabel>
							<FloatingLabel controlId="floatingPasswordNew" label="New Password" className="mb-3">
								<Form.Control name="new" type="password" placeholder="New Password" value={employeeInput.new} onChange={(e)=> changePassword(e)} required/>
							</FloatingLabel>
							<Button className="mb-3" style={{backgroundColor: "#f26926", width:"25%"}} type="submit" value="Submit">
								Submit
							</Button>
						</Form>
					</Col>
					<Col className = "text-center">
						<Button className="mb-3" size="sm"  style={{backgroundColor: "#f26926", width:"25%"}}>
							<Link to="/users" style={{color:"white", textDecoration:"none"}}>
								Back
							</Link>
						</Button>
					</Col>
				</Row>
			</Container>
		</>
	)
}

function WrongPassword(){
	const [show, setShow] = useState(true);

  	if (show) {
		return (
			<Alert variant="danger" onClose={() => setShow(false)} dismissible>
				<Alert.Heading>Username or Password incorrect</Alert.Heading>
			</Alert>
		)
	}
	return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}

export default EmployeePasswordChanger;