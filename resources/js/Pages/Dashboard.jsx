import React, { useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Box, Tab, Tabs} from "@mui/material";
import Users from "@/Pages/Users";
import Posts from "@/Pages/Post/Posts";

function TabPanel(props) {
    const { children, value, index} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...props}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default function Dashboard(props) {
    const [valueTab, setValueTab] = useState(0);

    const handleChange = (event, newValue) => {
        setValueTab(newValue);
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            roles={props.roles}
            tabValue={"Главная"}
        >
                        <Tabs value={valueTab} onChange={handleChange} centered>
                            <Tab label="Главная" color={"#fff"} value={0}/>
                            {props.roles.includes('admin') || props.roles.includes('manager') ?
                                <Tab label="Пользователи" color={"#fff"} value={1}/> : null
                            }
                            {props.roles.includes('admin') ?
                                <Tab
                                    label="Админ панель"
                                    color={"#fff"}
                                    value={2}
                                    onClick={()=>{window.location.href = '/admin';}}
                                /> : null
                            }
                            <Tab label="Посты" color={"#fff"} value={3}/>
                        </Tabs>
                        {/*<div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {auth.user.name}

                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Профиль</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Выйти
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>*/}

                        {/*<div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>*/}

                {/*<div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Главная
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800 dark:text-gray-200">
                                {auth.user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">{auth.user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>*/}

            <TabPanel value={valueTab} index={0}>
                {valueTab === 0 ? <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in!</div>
                        </div>
                    </div>
                </div> : null}

            </TabPanel>
            <TabPanel value={valueTab} index={1}>
               {valueTab === 1 ? <Users/> : null}
            </TabPanel>
            <TabPanel value={valueTab} index={3}>
                {valueTab === 3 ? <Posts /> : null}
            </TabPanel>
        </AuthenticatedLayout>
    );
}
