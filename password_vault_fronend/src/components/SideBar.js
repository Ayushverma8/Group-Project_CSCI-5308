import { useEffect, useState } from "react";
import { getUserProfile, setUserLoggedOut } from "../utils/authHelpers";
import Avatar from 'avataaars';


function SideBar() {

    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        setUserProfile(getUserProfile());
    }, [])

    return (
        <div class="sidebar" data-color="white" data-active-color="danger">
            <div class="logo">
                <div class="logo-image-small">
                    <Avatar avatarStyle="Circle" className="user-icon"></Avatar>
                </div>
                <a href="#" class="simple-text logo-normal">
                    <label id="lbluserid" style={{ fontWeight: "bolder" }}>{userProfile.firstName} {userProfile.lastName}</label>
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
                    <li>
                        <li>
                            <a href="#">
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
                        <a href="/todo">
                            <i class="nc-icon nc-bookmark-2 logo-color"></i>
                            <p>Todo</p>
                        </a>
                    </li>
                    <li >
                        <a href="/profile">
                            <i class="nc-icon nc-settings-gear-65 logo-color"></i>
                            <p>Profile</p>
                        </a>
                    </li>
                    <li >
                        <a onClick={setUserLoggedOut}>
                            <i class="nc-icon nc-button-power logo-color"></i>
                            <p>Logout</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar;