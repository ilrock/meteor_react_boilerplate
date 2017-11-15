import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import { validateNewUser } from './users.js';

if (Meteor.isServer){
    describe('users', function(){
        it ("should allow valid email address", function(){
            const testUser = {
                emails: [
                    { address: "test@email.com" }
                ]
            };
    
            const res = validateNewUser(testUser);
    
            expect(res).toBe(true);
        });

        it ("should not allow invalid email address", function(){
            const testUser = {
                emails: [
                    { address: "testemail.com" }
                ]
            };
        
            expect(() => {
                validateNewUser(testUser);
            }).toThrow();
        });
    });
}