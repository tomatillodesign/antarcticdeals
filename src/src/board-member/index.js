/**
 * Block dependencies
 */
//import classnames from 'classnames';
import icon from './icon';
import './style.css';
import './editor.css';

/**
 * Internal block libraries
 */

const { Fragment } = wp.element;
const {
    registerBlockType,
} = wp.blocks;
const {
    InspectorControls, RichText,
} = wp.editor;
const {
     Toolbar,
    Button,
    Tooltip,
    PanelBody,
    PanelRow,
    FormToggle,
    TextControl,
    IconButton,
    RangeControl,
} = wp.components;


/**
 * Register example block
 */
export default registerBlockType(
    'clb-custom-blocks/board-member',
    {
        title: 'Board Member',
        description:  'Add a new board member to the page.',
        category: 'common',
        icon: {
            foreground: '#fff',
            background: '#333',
            src: icon,
        },
        keywords: [
            'board',
            'member',
            'directors'
        ],
        attributes: {
             name: {
                type: 'string',
                source: 'text',
                selector: '.board-member-name',
             },
             title: {
                type: 'string',
                source: 'text',
                selector: '.board-member-title',
             },
             website: {
                type: 'string',
                source: 'text',
                selector: '.board-member-website',
             },
             bio: {
                 type: 'array',
                 source: 'children',
                 selector: '.board-member-bio-body',
             }
        },

        edit: props => {
            const { attributes: { name, title, website, bio }, className, isSelected, setAttributes } = props;
            const onChangeName = name => { setAttributes( { name } ) };
            const onChangeTitle = title => { setAttributes( { title } ) };
            const onChangeWebsite = website => { setAttributes( { website } ) };
            const onChangeBio = bio => { setAttributes( { bio } ) };

            return (
                <div className={ className }>
                { isSelected ? (
                     <div className ={ className + "-selected" } >
                     <TextControl
                          className='board-member-name-input'
                          label={ 'Name' }
                          value={ name }
                          placeholder={ 'Jane Doe' }
                          onChange={ onChangeName }
                     />
                     <TextControl
                          className='board-member-title-input'
                          label={ 'Title' }
                          value={ title }
                          placeholder={ 'Optional' }
                          onChange={ onChangeTitle }
                     />
                     <TextControl
                          className='board-member-website-input'
                          label={ 'Website' }
                          value={ website }
                          placeholder={ 'Optional' }
                          onChange={ onChangeWebsite }
                     />
                     <h4>Bio</h4>
                    <RichText
                        tagName="div"
                        multiline="p"
                        placeholder={ 'Add your custom bio' }
                  		onChange={ onChangeBio }
                  		value={ bio }
              		/>
                    </div>
               ) : (
                  <div class="static-board-member">
                       <p>Board Member: {name}</p>
                  </div>
               )}
                </div>
            );
        },
        save: props => {
                    const { attributes: { name, title, website, bio } } = props;

                    let titleToPublish = title;
                    if( titleToPublish ) { titleToPublish = ', ' + titleToPublish }

                    let websiteToPublish = website;
                    if( websiteToPublish ) { websiteToPublish = '<a href="' + website + '"><i class="fas fa-info-circle"></i></a>' }


                    if(website) {
                    return (
                         <div class="board-member-card-area">
                             <div class="board-member-card">
                                  <div class="board-member-name">
                                      <h4>{ name }<span class="board-member-title">{ titleToPublish }</span> <a href={website}><i class="fas fa-info-circle"></i></a> <span class="arrow-indicator-down"><i class="fal fa-chevron-down"></i></span><span class="arrow-indicator-up"><i class="fal fa-chevron-up"></i></span></h4>
                                  </div>
                                 <div class="board-member-bio-body">
                                     <em>{ bio }</em>
                                 </div>
                             </div>
                        </div>
                   ); } else {
                        return (
                            <div class="board-member-card-area">
                                <div class="board-member-card">
                                     <div class="board-member-name">
                                         <h4>{ name }<span class="board-member-title">{ titleToPublish }</span> <span class="arrow-indicator-down"><i class="fal fa-chevron-down"></i></span><span class="arrow-indicator-up"><i class="fal fa-chevron-up"></i></span></h4>
                                     </div>
                                    <div class="board-member-bio-body">
                                        <em>{ bio }</em>
                                    </div>
                                </div>
                           </div>
                      );
                   }
                },
    },
);
