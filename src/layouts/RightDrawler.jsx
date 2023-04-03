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
                <Button onClick={showDrawer}>
                    <MenuUnfoldOutlined />
                </Button>
            </Space>
            <Drawer placement={'right'} closable={false} onClose={onClose} open={open}>
                <RightSidebar />
            </Drawer>
        </>
    );
};
export default RightDrawler;
