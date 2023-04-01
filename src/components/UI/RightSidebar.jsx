import '~/scss/components/_rightSidebar.scss';
import { Col, Row, Button, List, Skeleton, Empty, Avatar, Space } from 'antd';
import Search from 'antd/es/input/Search';
import { useState, useEffect, useRef } from 'react';
import { getRequest } from '~/utils/axiosInstance';
import People from './People';
import { Link } from 'react-router-dom';
import Title from 'antd/es/typography/Title';

function RightSidebar() {
    // Call api lấy users và lưu vào peoples
    const [peoples, setPeoples] = useState([]);
    const [page, setPage] = useState(1);

    const [searchResult, setSearchResult] = useState([]);

    const [addFriendLoading, setAddFriendLoading] = useState(false);
    const [removeLoading, setRemoveLoading] = useState(false);

    // loading list people u may know và loading của nút load more user
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    // popup tìm kiếm
    const [showSearchPopper, setShowSearchPopper] = useState(false);

    const [disableShowMore, setDisableShowMore] = useState(false);

    // Tạo ref lấy tất cả số lượng users khi call API lần đầu
    // So sánh với số lượng users được get về
    // Nếu bằng thì tắt nút show more
    const totalUserRef = useRef();
    useEffect(() => {
        if (peoples.length === totalUserRef.current) {
            setDisableShowMore(true);
        }
    }, [peoples]);

    const onLoadMore = () => {
        setLoading(true);

        const newPage = page + 1;
        const getUserPagination = async () => {
            try {
                const response = await getRequest(`users/pagination?page=${newPage}&limit=20`);
                const newPeoplesList = peoples.concat(response.data.users);

                setPage(newPage);
                setPeoples(newPeoplesList);
                setLoading(false);
                window.dispatchEvent(new Event('resize'));
            } catch (error) {
                console.log(error);
            }
        };
        getUserPagination();
    };

    // disableShowMore luôn bằng fasle khi chưa hết danh sách users
    // khi click show more => loading = false => mất nút show more
    // có dữ liệu hiển thị lại
    const loadMore =
        !initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                {!disableShowMore && <Button onClick={onLoadMore}>loading more</Button>}
                {disableShowMore && (
                    <div
                        style={{
                            textAlign: 'center',
                            marginTop: 12,
                            height: 32,
                            lineHeight: '32px',
                        }}
                    >
                        The list has shown up !
                    </div>
                )}
            </div>
        ) : (
            ''
        );

    useEffect(() => {
        const getUserPagination = async () => {
            try {
                const response = await getRequest(`users/pagination?page=${page}&limit=20`);
                totalUserRef.current = response.data.countTotalUsers;
                setInitLoading(false);
                setPeoples(response.data.users);
            } catch (error) {
                console.log(error);
            }
        };
        getUserPagination();
    }, []);

    // Debounce Input Function
    function debounce(fn, ms) {
        let timer;

        return function () {
            const args = arguments;
            const context = this;

            if (timer) clearTimeout(timer);

            timer = setTimeout(() => {
                fn.apply(context, args);
            }, ms);
        };
    }

    const handleChangeInputSearch = debounce(e => {
        const inputSearch = e.target.value;

        if (inputSearch) {
            const fetchSearch = async () => {
                try {
                    const response = await getRequest(`users/search?q=${inputSearch}`);
                    setSearchResult(response.data.users);
                } catch (error) {}
            };

            fetchSearch();
        } else {
            setSearchResult([]);
        }
    }, 500);

    return (
        <div className='right-sidebar'>
            <Row>
                <Col span={24}>
                    <Search
                        onFocus={() => {
                            setShowSearchPopper(true);
                        }}
                        style={{ marginBottom: '1rem' }}
                        size='large'
                        placeholder='Find people...'
                        allowClear
                        onChange={handleChangeInputSearch}
                    />
                    <Title style={{ textAlign: 'center' }} level={3}>
                        People you may know
                    </Title>
                    {showSearchPopper && (
                        <div className='search-popper'>
                            {Array.isArray(searchResult) && searchResult.length > 0 && (
                                <List
                                    itemLayout='horizontal'
                                    dataSource={searchResult}
                                    renderItem={(item, index) => (
                                        <List.Item className='item-search'>
                                            <List.Item.Meta
                                                avatar={<Avatar src={item?.avatar} size={40} />}
                                                title={
                                                    <Link to={`/profile/${item._id}`}>
                                                        {item.displayName || item.username}
                                                    </Link>
                                                }
                                                description='bạn bè'
                                            />
                                        </List.Item>
                                    )}
                                />
                            )}
                            {Array.isArray(searchResult) && searchResult.length === 0 && (
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            )}
                        </div>
                    )}
                </Col>
            </Row>
            <Row className='peoples'>
                <Col span={24}>
                    <List
                        className='demo-loadmore-list'
                        loading={initLoading}
                        itemLayout='horizontal'
                        loadMore={loadMore}
                        dataSource={peoples}
                        renderItem={item => (
                            <List.Item>
                                <Skeleton avatar title={false} loading={item.loading} active>
                                    <People key={item._id} data={item} />
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </div>
    );
}

export default RightSidebar;
