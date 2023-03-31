/* eslint-disable no-unused-vars */
// import { Breadcrumb } from 'antd';
// import { Link, useLocation } from 'react-router-dom';

// function AppBreadcrumb() {
//     const location = useLocation();
//     const breadcrumbView = () => {
//         console.log(location);
//         const { pathname } = location;
//         const pathnames = pathname.split('/').filter(item => item);

//         return (
//             <Breadcrumb>
//                 {pathnames.length > 0 ? (
//                     <Breadcrumb.Item>
//                         <Link to='/'>Home</Link>
//                     </Breadcrumb.Item>
//                 ) : (
//                     <Breadcrumb.Item>Home</Breadcrumb.Item>
//                 )}
//                 {pathnames.map((name, index) => {
//                     const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
//                     const isLast = index === pathnames.length - 1;

//                     return isLast ? (
//                         <Breadcrumb.Item key={index}>{name}</Breadcrumb.Item>
//                     ) : (
//                         <Breadcrumb.Item>
//                             <Link to={`${routeTo}`}>{name}</Link>
//                         </Breadcrumb.Item>
//                     );
//                 })}
//             </Breadcrumb>
//         );
//     };
//     return <>{breadcrumbView()}</>;
// }

// export default AppBreadcrumb;

import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
function AppBreadcrumb() {
    const items = [
        {
            href: '',
            title: <HomeOutlined />,
        },
        {
            href: '',
            title: (
                <>
                    <UserOutlined />
                    <span>Application List</span>
                </>
            ),
        },
        {
            title: 'Application',
        },
    ];
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const breadcrumbItems = pathSnippets.map((snippet, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        const name =
            index === pathSnippets.length - 1
                ? snippet.replace('-', ' ')
                : snippet.charAt(0).toUpperCase() + snippet.slice(1);
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{name}</Link>
            </Breadcrumb.Item>
        );
    });

    return <Breadcrumb items={items} />;
}

export default AppBreadcrumb;
