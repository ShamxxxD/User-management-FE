import { Button, Drawer, Space } from 'antd';
import { useState } from 'react';
import { MenuUnfoldOutlined } from '@ant-design/icons';

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
                <Button onClick={showDrawer}>
                    <MenuUnfoldOutlined />
                </Button>
            </Space>
            <Drawer title='Sham Social' placement={'left'} closable={false} onClose={onClose} open={open}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </>
    );
};
export default LeftDrawler;
