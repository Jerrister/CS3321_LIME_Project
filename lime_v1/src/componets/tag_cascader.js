// import { Cascader } from 'antd';
// import React, { useEffect, useState } from 'react';
// import GetOptions from '../services/get_options';
// // TODO 根据InselectedValues 获取不同层级的tag
// // 定义一个get optioins: 来获得不同层级的tag

// export default function TagCascader({handleSelectedValues, InselectedValues})
// {
//     const options = GetOptions(InselectedValues);

//     const onChange = (value, selectedOptions) => {
//     handleSelectedValues(selectedOptions.map(option => option.value));
//     //   console.log(value);
//       };


//     return (
//       <div style={{width:"656px"}}>
//       <Cascader
//         options={options}
//         onChange={onChange}
//         // defaultValue={['All']}
//         expandTrigger="click" // 设置 expandTrigger 为 click，以实现点击展开下级选项的功能
//         value={InselectedValues}
//         style={{ width: 'auto' }} // 设置宽度自适应
//       />
//       </div>
//     );
// }

import React, { useState, useEffect } from 'react';
import { Cascader } from 'antd';
import GetOptions from '../services/get_options';

export default function TagCascader({ handleSelectedValues, InselectedValues }) {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        GetOptions(InselectedValues).then(setOptions).catch(error => {
            console.error('Failed to fetch options:', error);
            setOptions([]); // 设置默认或错误状态
        });
    }, [InselectedValues]); // 依赖于 InselectedValues

    const onChange = (value, selectedOptions) => {
        handleSelectedValues(selectedOptions.map(option => option.value));
    };

    return (
        <div style={{ width: "656px" }}>
            <Cascader
                options={options}
                onChange={onChange}
                expandTrigger="click"
                value={InselectedValues}
                style={{ width: 'auto' }}
            />
        </div>
    );
}
