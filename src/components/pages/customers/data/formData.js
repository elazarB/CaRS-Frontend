import { useState, useEffect } from 'react';
import { apiGet } from '../../../../services/services';
import { URL_DRIVERS } from '../../../../data/constants';
import { Select } from 'antd';
import { IdcardOutlined, PhoneOutlined } from '@ant-design/icons';
import { DataList } from '../../../forms/dataList';


export const formInputsCustomer = [
  {
    name: 'name',
    type: 'search',
    placeholder: 'שם מלא',
    label: 'שם הלקוח',
    tag: 'input',
    required: true,
    pattern: '^[a-zA-Z-\u0590-\u05FF ]+$',
    errorMessage: 'יש להזין אותיות בלבד',
  },
  {
    name: 'identity',
    type: 'search',
    placeholder: 'מספר זהות',
    label: 'מספר זהות',
    tag: 'input',
    pattern: '^[a-zA-Z0-9]+$',
    errorMessage: 'מספר זהות שגוי',
  },
  {
    name: 'ID_type',
    type: 'search',
    placeholder: 'סוג מזהה',
    label: 'סוג מזהה',
    tag: 'select',
    option: ['ת.ז.', 'דרכון', 'ח.פ.', 'ע.ר.'],
  },
  {
    name: 'country',
    type: 'search',
    placeholder: 'מדינה',
    label: 'ארץ',
    tag: 'input',
    pattern: '^[a-zA-Z-\u0590-\u05FF ]+$',
    errorMessage: 'שם המדינה שגוי',
  },
  {
    name: 'city',
    type: 'search',
    placeholder: 'עיר',
    label: 'עיר',
    tag: 'input',
    pattern: '^[a-zA-Z-\u0590-\u05FF ]+$',
    errorMessage: 'שם העיר שגוי',
  },
  {
    name: 'address',
    type: 'search',
    placeholder: 'כתובת',
    label: 'כתובת',
    tag: 'input',
    pattern: '^[0-9a-zA-Z-\u0590-\u05FF ]+$',
    errorMessage: 'כתובת שגויה',
  },
  {
    name: 'phone_number',
    type: 'tal',
    placeholder: "מס' טלפון",
    label: "מס' טלפון",
    tag: 'input',
    required: true,
    pattern: '^[(]{0,1}[0-9]{3}[)]{0,1}[-s.]{0,1}[0-9]{3}[-s.]{0,1}[0-9]{3,}$',
    errorMessage: 'מספר טלפון שגוי',
  },
  {
    name: 'another_phone_number',
    type: 'search',
    placeholder: 'טלפון נוסף',
    label: 'טלפון נוסף',
    tag: 'input',
    pattern: '^[(]{0,1}[0-9]{3}[)]{0,1}[-s.]{0,1}[0-9]{3}[-s.]{0,1}[0-9]{3,}$',
    errorMessage: 'מספר טלפון שגוי',
  },
  {
    name: 'email',
    type: 'email',
    placeholder: "דוא''ל",
    label: "דוא''ל",
    tag: 'input',
    pattern: '^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$',
    errorMessage: 'דוא"ל שגוי',
  },
  {
    name: 'drivers',
    type: 'search',
    placeholder: 'נהגים',
    label: 'נהגים',
    tag: 'dataList',
    data: (
      <DataList mode='multiple' name={'drivers'} url={URL_DRIVERS} info1={['name']} info2={['זהות', 'identity']} info3={['טלפון', 'phone_number']} />
    ),
  },
];

// car values object
export const customerValues = {
  name: '',
  identity: '',
  ID_type: '',
  country: '',
  city: '',
  address: '',
  phone_number: '',
  another_phone_number: '',
  email: '',
  drivers: [],
  images: [],
  files: [],
};
