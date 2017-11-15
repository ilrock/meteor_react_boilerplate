import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { PrivateHeader } from './PrivateHeader';

if (Meteor.isClient){
    describe('PrivateHeader', function () {
        Enzyme.configure({ adapter: new Adapter() });
        it('should use title prop in brand-logo', function(){
            const title = "Test title"
            const wrapper = mount(<PrivateHeader title={title} handleLogout={()=>{}}/>)
            const brandText = wrapper.find('.brand-logo').text();

            expect(brandText).toBe(title);
        });

        it('should call handleLogout on button click', function(){
            const spy = expect.createSpy();
            const wrapper = mount(<PrivateHeader title="Test title" handleLogout={spy}/>)
    
            wrapper.find('.btn-logout').simulate('click');
    
            expect(spy).toHaveBeenCalled();
        });
    });
}