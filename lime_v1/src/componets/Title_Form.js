import React, { useState }  from 'react';
import {  Row, Col, Card } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import { Button, Radio } from 'antd';
import ReferenceTable from './reference_table';
import { Breadcrumb,  theme} from 'antd';
import TagCascader from "./tag_cascader";

import { useLoaderData } from 'react-router';
import SearchBar from './SearchBar';




export default function Title_form({ selectedValues, setSelectedValues}) {
    console.log("selected values:", selectedValues);
    // console.log(selectedValues[0] === "All Tags");


    if (selectedValues[0] === "All Tags") {
        return  <SearchBar InPage={"TagPage"} />;
      } else {
        return  <TagCascader handleSelectedValues={ setSelectedValues} InselectedValues={selectedValues}   />;
      }
}



