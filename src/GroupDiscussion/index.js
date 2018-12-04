import React, {Component} from 'react';
import {Icon, Comment, Header, Metadata, Text, Actions, Avatar, Form, Button} from 'semantic-ui-react';


const serverUrl = 'http://localhost:5000/'
class GroupDiscussion extends Component{
	constructor(){
		super()

		this.state = {
			commentBody: '',
			author: '',
			comments: []
		}
	}
	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}
	handleLike = async (e) => {
		e.preventDefault();
		console.log(e.currentTarget.id, '<--HERES TARGET ID');
		const id = e.currentTarget.id
		const commentToEdit = await fetch(serverUrl + 'api/comments/' + e.currentTarget.id);
		const parsedComment = await commentToEdit.json();
		console.log(parsedComment.data._id);
		const newLikes = parsedComment.data.likes + 1;

		const editComment = await fetch(serverUrl + 'api/comments/' + parsedComment.data._id, {
			method: 'PUT',
			body: JSON.stringify({
				likes: newLikes
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const parsedEditedComment = await editComment.json();

		const commentArray = this.props.group.discussion.filter((comment) => {
				if(parsedEditedComment.data._id !== comment._id){
					return comment
				}
			})
		commentArray.push(parsedEditedComment.data);

		const editedGroup = await fetch(serverUrl + 'api/groups/' + this.props.group._id, {
			method: 'PUT',
			body: JSON.stringify({
				discussion: commentArray
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		this.fetchComments().then((comments) => {
			this.setState({
				comments: comments
			})
		})

	}
	fetchComments = async () => {
		const group = await fetch(serverUrl + 'api/groups/' + this.props.group._id);
		const parsedGroup = await group.json();
		const comments = parsedGroup.data.discussion;
		console.log(comments, '<---THESE ARE THE COMMENTS FROM THE GROUP DISCUSSION');
		return comments
	}

	handleComment = async (e) => {
		const userAuthor = await fetch(serverUrl + 'api/users', {credentials: 'include'});
		const parsedUserAuthor = await userAuthor.json();
		
		this.setState({
			author: parsedUserAuthor.data
		})
		const commentToCreate = await fetch(serverUrl + 'api/comments', {
			method: 'POST',
			body: JSON.stringify({
				body: this.state.commentBody,
				author: this.state.author.username
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const parsedComment = await commentToCreate.json();

		const commentArray = this.props.group.discussion.map((comment) => {

			return comment
		})
		commentArray.push(parsedComment.data);
		const editedGroup = await fetch(serverUrl + 'api/groups/' + this.props.group._id, {
			method: 'PUT',
			body: JSON.stringify({
				discussion: commentArray
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		this.fetchComments().then((comments) => {
			this.setState({
				comments: comments
			})
		})

	}
	componentDidMount(){
		this.fetchComments().then((comments) => {
			this.setState({
				comments: comments
			})
		})
	}
	render(){
		
		const discussionComments = this.state.comments.map((comment) => {
			return(
				<Comment.Content>
        			<Comment.Author>{comment.author}</Comment.Author>
        			<Comment.Metadata>
         			<div>{comment.timeStamp}</div>
         			<div>
           				<Icon id={comment._id} onClick={this.handleLike} name='star' />
            				{comment.likes} likes
          			</div>
        			</Comment.Metadata>
        			<Comment.Text>
         				<p>{comment.body}</p>
        			</Comment.Text>
       				<Comment.Actions>
          				<Comment.Action>Reply</Comment.Action>
        			</Comment.Actions>
      			</Comment.Content>
				)
		})
		return(
			 <Comment.Group>
    			<Header as='h3' dividing>
      				Discussion
   				</Header>

   				 <Comment>
     				{discussionComments}
   				 </Comment>
   			

    			<Form onSubmit={this.handleComment} reply>
     				<Form.TextArea name='commentBody' onChange={this.handleChange}/>
      				<Button content='Add Reply' labelPosition='left' icon='edit' primary />
    			</Form>
  			</Comment.Group>

			)
	}
}

export default GroupDiscussion;