import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Signup } from './Signup';
import { debug } from 'util';
import { wrap } from 'module';

if (Meteor.isClient){
    describe('Signup', function () {
        Enzyme.configure({ adapter: new Adapter() });
        it('should show error messages', function(){
            const error = "This is an error";
            const wrapper = mount(<Signup createUser={()=>{}}/>);
            wrapper.setState({ error });
            expect(wrapper.find('.error').text()).toBe(error);

            wrapper.setState({error: ''});
            expect(wrapper.find('.error').length).toBe(0);
        });

        it('should call createUser with the form data', function(){      
            const credentials = { email: "test@test.com", password: "password" };
            const spy = expect.createSpy();
            const wrapper = mount(<Signup createUser={spy}/>);

            wrapper.ref('email').value = credentials.email;
            wrapper.ref('password').value = credentials.password;

            wrapper.find('form').simulate('submit');
            expect(spy.calls[0].arguments[0]).toEqual({ ...credentials });
        });

        it('should set an error when the form is invalid', function(){      
            const spy = expect.createSpy();
            const wrapper = mount(<Signup createUser={spy}/>);
            const reason = "Error reason";
            wrapper.find('form').simulate('submit');

            spy.calls[0].arguments[1]({ reason });

            expect(wrapper.state('error')).toBe(reason);

            spy.calls[0].arguments[1]();
            expect(wrapper.state('error').length).toBe(0);
        });
    });
}