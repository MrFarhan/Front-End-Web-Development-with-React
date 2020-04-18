import React, { Component } from 'react'
import {Card,CardImg,Button,CardText,CardBody,CardTitle,Fade,Breadcrumb,BreadcrumbItem,Modal,ModalHeader,ModalBody,Form,FormGroup,Input,Label,Row,Col} from 'reactstrap'
import { Control, LocalForm, Errors,Stagger } from 'react-redux-form'
import { Link } from 'react-router-dom'





function RenderDish ({ dish }) {
  if (dish != null) {
    return (
      <Card>
        <CardImg width='100%' src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    )
  } else {
    return <div></div>
  }
}

// Instructor code
function RenderComments({comments,addComment, dishId}) {
  if (comments != null)
      return(
          <div className="">
              <h4>Comments</h4>
              <ul className="list-unstyled">
                  <li>
                      {comments.map((comment) => {
                          return (
                              <div in key={comment._id}>
                                  <div>
                                  <p>{comment.comment}</p>
                                  <p>{comment.author}</p>
                                 <p> {new Intl.DateTimeFormat('en-US', {year: 'numeric',month: 'short',day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>

                                  </div>
                              </div>
                          );
                      })}
                  </li>
              </ul>
              <CommentForm dishId={dishId} addComment={addComment}/>
          </div>
      );
  else
      return(
          <div></div>
      );
}






// my code

// function RenderComments ({ comments }) {
//   if (comments != null) {
//     const commentss = comments.map(comment => {
//       return (
//         <div key={comment.id}>
//           <ul className='list-unstyled'>
//             <li>{comment.comment}</li>
//             <li>
//               {comment.author} ,{' '}
//               {new Intl.DateTimeFormat('en-US', {
//                 year: 'numeric',
//                 month: 'short',
//                 day: '2-digit'
//               }).format(new Date(Date.parse(comment.date)))}
//             </li>
//           </ul>
//         </div>
//       )
//     })
//     return (
//       <div>
//         <h4 className='col-12'>Comments</h4>
//         <div>{commentss}</div>
//       </div>
//     )
//   } else {
//     return <div></div>
//   }
// }

const DishDetail = props => {
  console.log(props, 'props in disbdetailComponent')
  return (
    <div className='container'>
      <div className='row'>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to='/menu'>Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className='col-12'>
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className='row'>
        <div className='col-12 col-md-5 m-1'>
          <RenderDish dish={props.dish} />
        </div>
        <div className='col-12 col-md-5 m-1'>
        <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id}/>
        </div>
      </div>
    </div>
  )
}

class CommentForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isModalOpen: false
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.handleform = this.handleform.bind(this)
  }

  toggleModal () {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }

  handleform(values){
    this.toggleModal();
    // alert("Current status is " + JSON.stringify(values));
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  haldleBlur = (field) => (evt) =>{
    this.setState=({
      touched: { ...this.state.touched, [field] : true},
    })

  }
  render () {
    const required = (val) => val && val.length;
    const minLength = (len) => (val) => val && (val.length >= len);
    const maxLength = (len) => (val) => !(val) || (val.length <= len);


    return (
      <>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment </ModalHeader>
          <ModalBody>


            <LocalForm onSubmit={(values)=> this.handleform(values)}>
             {/* <FormGroup> */}
              <Row className='form-group'>
                <Label htmlFor='rating' md={2}>
                  Rating
                </Label>
                <Col md={12}>
                  <Control.select model='.rating'id='rating'name='rating'className='form-control'>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
                </Col>
              </Row>
                <Row className="form-group" >
                <Col md={12}>
                <Label htmlFor='author'> Your Name</Label>
                <Control.text id='author' model=".author" placeholder='Your name' className="form-control"
                validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}
                />
                <Errors className="text-danger" model=".author" show="touched" messages={{required: "Required * ", 
                minLength: 'Must be greater than 2 characters',maxLength: 'Must be 15 characters or less'}}/>
              </Col>
              {console.log("errors", Errors.message)}
              </Row>

              <Row className="form-group">
                <Col md={12}>
                <Label htmlFor='comment'> Your Comment</Label>
                <Control.textarea type='textarea' model=".textarea" id='comment' rows="6" className="form-control"/>
             </Col></Row>

              <Row className="form-group">
              <Col md={12}>
              <Button type="submit" color="primary">Submit</Button>
              </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
        <button onClick={this.toggleModal}><span className='fa fa-pencil fa-lg'>  </span> Submit Comment </button>
      </>
    )
  }
}

export default DishDetail