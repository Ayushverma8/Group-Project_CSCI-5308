import { useEffect, useState } from "react";
import API_CLIENT from "../api/axiosClient";
import {Card} from "react-bootstrap";


function Home() {
	const [test, setTest] = useState();

	useEffect(async () => {
		let res = await API_CLIENT.get('test/');
		setTest(res.data)
	}, [])

  // const Vaults=[
  //   {image_path:"../assets/img/outlook.jpeg",user_id:"user_id",title:"Outlook"},
  //   {image_path:"../assets/img/google.png",user_id:"user_id",title:"Google"},
  //   {image_path:"../assets/img/linkedin.png",user_id:"user_id",title:"Linkedin"},
  //   {image_path:"../assets/img/dalhousie.png",user_id:"user_id",title:"Dalhousie"},
  //   {image_path:"../assets/img/netflix.png",user_id:"user_id",title:"Netflix"},
  //   {image_path:"../assets/img/amazon.png",user_id:"user_id",title:"Amazon"},
  //   {image_path:"../assets/img/facebook.png",user_id:"user_id",title:"Facebook"}
  // ];
  const Vaults=[
    {image_path:"../assets/img/outlook.jpeg",title:"Outlook"},
    {image_path:"../assets/img/google.png",title:"Google"},
    {image_path:"../assets/img/linkedin.png",title:"Linkedin"},
    {image_path:"../assets/img/dalhousie.png",title:"Dalhousie"},
    {image_path:"../assets/img/netflix.png",title:"Netflix"},
    {image_path:"../assets/img/amazon.png",title:"Amazon"},
    {image_path:"../assets/img/facebook.png",title:"Facebook"}
  ];

  const renderboostrapCard=(data,index)=>{

    return(
    
        <><div class="col-lg-3 col-md-6 col-sm-6">
        <div class="card card-stats">
          <div class="card-body">
            <div class="row">
              <div class="col-5 col-md-10">
                <div>
                  <img src={data.image_path} class="card-logo"></img>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-10">
                <p class="card-title">{data.title}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-5 col-md-10">
                <p class="card-category">{data.user_id}</p>
              </div>
            </div>
          </div>
        </div>
    </div></>
     

    )
  }
 

	return (<>
    <div class="wrapper ">
    <div class="sidebar" data-color="white" data-active-color="danger">
      <div class="logo">
          <div class="logo-image-small">
            <img src="../assets/img/user (1).png" class="user-icon"/>
          </div>
        <a href="#" class="simple-text logo-normal">
        <label id="lbluserid" style={{fontWeight:"bolder"}}>Manasvi Sharma</label>
        </a>
      </div>
      <div class="sidebar-wrapper ">
        <ul class="nav">
          <li>
            <a href="/home">
              <i class="nc-icon nc-bank logo-color"></i>
              <p>Dashboard</p>
            </a>
          </li>
          <li  >
          <li  >
          <a href="/notes">
            <i class="nc-icon nc-box-2 logo-color"></i>
            <p>Vault</p>
          </a>
        </li>
            <a href="/notes">
              <i class="nc-icon nc-bullet-list-67 logo-color"></i>
              <p>Notes</p>
            </a>
          </li>
          <li >
            <a href="./map.html">
              <i class="nc-icon nc-bookmark-2 logo-color"></i>
              <p>Todo</p>
            </a>
          </li>
          <li >
            <a href="./notifications.html">
              <i class="nc-icon nc-button-power logo-color"></i>
              <p>Logout</p>
            </a>
          </li>
          <li >
            <a href="./user.html">
              <i class="nc-icon nc-simple-remove logo-color"></i>
              <p>Delete Account</p>
            </a>
          </li>
          
        </ul>
      </div>
    </div>
    <div class="main-panel">
      <nav class="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
        <div class="container-fluid">
          <div class="navbar-wrapper">
            <div class="navbar-toggle">
              <button type="button" class="navbar-toggler">
                <span class="navbar-toggler-bar bar1"></span>
                <span class="navbar-toggler-bar bar2"></span>
                <span class="navbar-toggler-bar bar3"></span>
              </button>
            </div>
            <a class="navbar-brand" href="javascript:;">Password Vault</a>
          </div>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-bar navbar-kebab"></span>
            <span class="navbar-toggler-bar navbar-kebab"></span>
            <span class="navbar-toggler-bar navbar-kebab"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navigation">
            <form>
              <div class="input-group no-border">
                <input type="text" value="" class="form-control" placeholder="Search..."/>
                <div class="input-group-append">
                  <div class="input-group-text">
                    <i class="nc-icon nc-zoom-split"></i>
                  </div>
                </div>
              </div>
            </form>
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link btn-magnify" href="javascript:;">
                  {/* <i class="nc-icon nc-layout-11"></i> */}
                  <p>
                    <span class="d-lg-none d-md-block">Stats</span>
                  </p>
                </a>
              </li>
              {/* <li class="nav-item btn-rotate dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="nc-icon nc-bell-55"></i>
                  <p>
                    <span class="d-lg-none d-md-block">Some Actions</span>
                  </p>
                </a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <a class="dropdown-item" href="#">Something else here</a>
                </div>
              </li> */}
              <li class="nav-item">
                <a class="nav-link btn-rotate" href="javascript:;">
                  <i class="nc-icon nc-settings-gear-65"></i>
                  <p>
                    <span class="d-lg-none d-md-block">Account</span>
                  </p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="content">
        <div class="row">

                  {Vaults.map(renderboostrapCard)}

                  
        </div>
      </div>
      <footer class="footer footer-black  footer-white ">
        <div class="container-fluid">
          <n/>
          <n/>
          <n/>
          <n/>
          <n/>
          <n/>
          <div class="row">
            <nav class="footer-nav">
            </nav>
            <div class="credits ml-auto">
              <span class="copyright">
            
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
    </>)
    
   
  }
 

    export default Home;