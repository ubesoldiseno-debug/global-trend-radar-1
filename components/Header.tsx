import React from 'react';
import { SITE_TITLE, SITE_SUBTITLE } from '../constants';
export default function Header(){
  return (<header className="header"><div className="title">{SITE_TITLE}</div><div className="subtitle">{SITE_SUBTITLE}</div></header>)
}
