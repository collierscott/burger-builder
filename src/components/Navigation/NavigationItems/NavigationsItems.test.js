import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('should render two <NavigationItem /> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItem /> elements if authenticated', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should not have logout <NavigationItem /> element if not authenticated', () => {
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(false);
    });

    it('should have logout <NavigationItem /> element if authenticated', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });

    it('should not have login <NavigationItem /> element if authenticated', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.contains(<NavigationItem link="/login">Login</NavigationItem>)).toEqual(false);
    });

    it('should have login <NavigationItem /> element if not authenticated', () => {
        expect(wrapper.contains(<NavigationItem link="/login">Login</NavigationItem>)).toEqual(true);
    });
});