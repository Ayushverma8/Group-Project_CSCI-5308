import { setUserLoggedOut } from "../utils/authHelpers";

function SideBar() {
    return (
        <div class="sidebar" data-color="white" data-active-color="danger">
            <div class="logo">
                <div class="logo-image-small">
                    <img src="../assets/img/user (1).png" class="user-icon" />
                </div>
                <a href="#" class="simple-text logo-normal">
                    <label id="lbluserid" style={{ fontWeight: "bolder" }}>Manasvi Sharma</label>
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