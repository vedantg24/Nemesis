import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { loadUser } from "../actions/userActions";
import { useHistory } from "react-router-dom";

import Register from './Register';
import UserDisplay from './UserDisplay';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Dashboard = ({ loadUser, isAuthenticated }) => {
    let history = useHistory();
    useEffect(() => {
        if (localStorage.token) {
            loadUser();
        }
        // eslint-disable-next-line
    }, []);
    return (
        <div>
            {isAuthenticated === false ? (
                history.push("/")
            ) : (
                    // <div className="container">
                    //     <div className="row">
                    //         <div className="col s12 center-align ">
                    //             <ul className="tabs tabs-fixed-width ">
                    //                 <li className="tab col s3 "><a className="active" href="#test1">Register User</a></li>
                    //                 <li className="tab col s3 "><a href="#test2">Users</a></li>
                    //             </ul>
                    //         </div>
                    //         <div id="test1" className="col s12"><Register /></div>
                    //         <div id="test2" className="col s12"><UserDisplay /></div>
                    //     </div>
                    // </div>
                    <div className="container">

                        <Tabs>
                            <TabList className="tablist">
                                <Tab >Register User</Tab>
                                <Tab >Users</Tab>
                            </TabList>

                            <TabPanel>
                                <Register />
                            </TabPanel>
                            <TabPanel>
                                <UserDisplay />
                            </TabPanel>
                        </Tabs>
                    </div>
                )}
        </div>

    )
}

const mapSateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapSateToProps, { loadUser })(Dashboard);
