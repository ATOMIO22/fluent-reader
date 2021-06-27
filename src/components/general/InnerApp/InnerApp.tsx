import React, { useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import { Route, useHistory, useLocation } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import Library from '../../library/Library/Library';
import AddArticle from '../../add-article/AddArticle/AddArticle';

const InnerApp: React.FC = () => {
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const lastPage = localStorage.getItem('lastPage');

        if (lastPage === null) {
            history.push('/app/library');
        } else {
            history.push(lastPage);
        }
    }, [history]);

    useEffect(() => {
        localStorage.setItem('lastPage', location.pathname);
    }, [location.pathname]);

    return (
        <Flex direction={{ md: 'column-reverse', lg: 'row' }} w="100%" h="100%">
            <SideBar />
            <Route path="/app/library">
                <Library />
            </Route>
            <Route path="/app/read">Read</Route>
            <Route path="/app/add-article">
                <AddArticle />
            </Route>
            <Route path="/app/settings">Settings</Route>
        </Flex>
    );
};

export default InnerApp;
