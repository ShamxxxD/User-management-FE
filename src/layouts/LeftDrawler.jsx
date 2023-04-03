import { Drawer, Space } from 'antd';
import { useState } from 'react';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import AppHeader from './Header';

const LeftDrawler = () => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Space>
                <div  onClick={showDrawer}  style={{background:'transparent', color:'#fff'}}>
                    <MenuUnfoldOutlined />
                </div>
            </Space>
            <Drawer  placement={'left'} closable={false} onClose={onClose} open={open}>
               <AppHeader />
            </Drawer>
        </>
    );
};
export default LeftDrawler;
