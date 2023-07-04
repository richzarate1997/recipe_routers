import { useEffect, useState } from 'react';
import {
    Box, Tab, Tabs
} from '@mui/material';
import GroceryListPanel from './GroceryListPanel';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function GroceryLists({ gLists }) {
    const [value, setValue] = useState(0);
    const [lists, setLists] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        setLists(gLists);
    }, [gLists]);

    const renderTabs = (lists) => {
        return lists.map((list) =>
            <Tab key={list.id} label={list.name} {...a11yProps(list.id)} />
        )
    }

    const renderTabPanels = (lists) => {
        return lists.map((list) =>
            <GroceryListPanel key={list.id} list={list.list} value={value} index={list.id} />
        )
    }

    return (
        <Box sx={{ marginRight: 5 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="grocery lists">
                    {lists.length > 0
                        ? renderTabs(lists)
                        : 'You currently have no grocery lists.'}
                </Tabs>
            </Box>
            {lists.length > 0 && renderTabPanels(lists)}
        </Box>
    );
}