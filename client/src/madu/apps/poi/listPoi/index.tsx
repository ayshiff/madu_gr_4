import React from 'react';
import { Layout, Menu, Icon, Input, Button, Table, Divider } from 'antd';
import 'antd/dist/antd.css';

const { Header, Sider, Content } = Layout;

export const ListPoi = () =>  {

  const tableData = [
    {
      key: '1',
      nomDuLieu: 'Mike',
      categorie: 'Mike',
      questionnr: 'En Attente',
      greenscore: 72,
      address: '10 Downing Street',
    },
    {
      key: '2',
      nomDuLieu: 'John',
      categorie: 'Mike',
      questionnr: 'En attente',
      greenscore: 42,
      address: '10 Downing Street',
    },
    {
      key: '1',
      nomDuLieu: 'Mike',
      categorie: 'Mike',
      questionnr: 'En Attente',
      greenscore: 72,
      address: '10 Downing Street',
    },
    {
      key: '2',
      nomDuLieu: 'John',
      categorie: 'Mike',
      questionnr: 'En attente',
      greenscore: 42,
      address: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'Nom du lieu',
      dataIndex: 'nomDuLieu',
      key: 'nomDuLieu',
      // render: text => <a href="#">{text}</a>,
    },
    {
      title: 'Catégorie',
      dataIndex: 'categorie',
      key: 'categorie',
    },
    {
      title: 'Suivi question',
      dataIndex: 'questionnr',
      key: 'questionnr',
    },
    // {
    //   title: 'Tag questionnr',
    //   key: 'tags',
    //   dataIndex: 'tags',
    // },
    {
        title: 'Greenscore',
        dataIndex: 'greenscore',
        key: 'greenscore',
      },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <span>
          <a>Edit</a>
          <Divider type="vertical" />
          <a>Delete</a>
        </span>
      ),
    },
  ];

  const headerStyle = {
    background: '#fff', 
    padding: 0, 
    display: "flex",
    justifyContent: "space-between"
  }

  const titleStyle = {
    marginLeft: '20px',
    fontWeight: 500,
    fontSize: '28px'
  }

  const { Search } = Input;
    return (
      <Layout>
        <Sider trigger={null} collapsible>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>P.O.I</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>QuestionnR</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>Clients</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={headerStyle}>
          <h1 style={ titleStyle }>Liste des points d’intêret</h1>
          <div>
          <Search
            placeholder="Search"
            onSearch={value => console.log(value)}
            style={{ width: 250 }}
            />           
            <Button type="primary" style={{ marginRight: '20px', marginLeft: '40px',}} >
            + Ajouter un point d’intêret
            </Button> 
          </div>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 840,
            }} 
          >
            <Table columns={columns} dataSource={tableData} />
          </Content>
        </Layout>
      </Layout>
    );
}
