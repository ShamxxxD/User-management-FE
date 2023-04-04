import { Button, Drawer, Space } from 'antd';
import { useState } from 'react';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import RightSidebar from '~/components/UI/RightSidebar';

const RightDrawler = () => {
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
            <Drawer placement={'right'}  width='32rem'   closable={true} onClose={onClose} open={open}>
                <RightSidebar />
            </Drawer>
        </>
    );
};
export default RightDrawler;
