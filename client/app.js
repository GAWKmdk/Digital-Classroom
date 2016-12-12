import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './app.html';
//import './hammerjs_supportfile.js';

/* Sample Notification Toasts */
Template.header.events({
  'click .success'(event, instance) {
    
       toastr.success('You pressed Success !'); 
Router.go('/');
      
  },
    'click .warning'(event, instance) {
    
       toastr.warning('You pressed Warning !'); 
Router.go('/');
      
  },
    'click .info'(event, instance) {
    
       toastr.info('You pressed Info !'); 
Router.go('/');
    },
    
    'click .error'(event, instance) {
    
       toastr.error('You pressed Error !'); 
Router.go('/');
 
    }
});
