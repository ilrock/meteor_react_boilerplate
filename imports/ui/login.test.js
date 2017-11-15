import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Login } from './Login';
import { debug } from 'util';
import { wrap } from 'module';

if (Meteor.isClient){
    describe('Login', function () {
        Enzyme.configure({ adapter: new Adapter() });
        it('should show error messages', function(){
            const error = "This is an error";
            const wrapper = mount(<Login loginWithPassword={()=>{}}/>);
            wrapper.setState({ error });
            expect(wrapper.find('.error').text()).toBe(error);

            wrapper.setState({error: ''});
            expect(wrapper.find('.error').length).toBe(0);
        });

        it('should call loginWithPassword with the form data', function(){      
            const credentials = { email: "test@test.com", password: "password" };
            const spy = expect.createSpy();
            const wrapper = mount(<Login loginWithPassword={spy}/>);

            wrapper.ref('email').value = credentials.email;
            wrapper.ref('password').value = credentials.password;

            wrapper.find('form').simulate('submit');
            expect(spy.calls[0].arguments[0]).toEqual({ email: credentials.email });
            expect(spy.calls[0].arguments[1]).toBe(credentials.password);
        });

        it('should set an error when the form is invalid', function(){      
            const spy = expect.createSpy();
            const wrapper = mount(<Login loginWithPassword={spy}/>);

            wrapper.find('form').simulate('submit');

            spy.calls[0].arguments[2]({});
            expect(wrapper.state('error')).toNotBe('');

            spy.calls[0].arguments[2]();
            expect(wrapper.state('error').length).toBe(0);
        });
    });
}