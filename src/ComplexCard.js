import React from 'react';

class ComplexCard extends React.Component {

     render() {

         const { classes } = this.props;

         // Set variables passed in
         let entryTitle = this.props.entryTitle;
         let entryExcerpt = this.props.entryExcerpt;
         let entryContent = this.props.entryContent;
         let entryDate = this.props.date;
         let author = this.props.author;
         let link = this.props.link;

         return (

         <div>
          <a href={link} target="_blank"><h2>{entryTitle}</h2></a>
         </div>

          );

         }

}

export default ComplexCard;
