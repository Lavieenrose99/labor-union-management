/*
 * @Author: your name
 * @Date: 2021-05-24 18:05:30
 * @LastEditTime: 2021-05-25 09:20:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /labor-union-management/src/utils/public/tags_group.tsx
 */
import React from 'react'
import { Tag, Input, Tooltip, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

class EditableTagGroup extends React.Component {
  state = {
    tags: ['Unremovable', 'Tag 2', 'Tag 3'],
    inputVisible: false,
    inputValue: '',
    editInputIndex: -1,
    editInputValue: '',
    editId:0
  };
  

  handleClose = removedTag => {
    Modal.warning({
        title: '全国总工会',
        content: '确认删除吗',
        okText: '确认',
        onOk: ()=>{
            this.props.dispatch({
                type: 'setcentermodel/delInfosTags',
                payload: removedTag.id
            }).then(()=>{
                const tags = this.state.tags.filter(tag => tag !== removedTag);
                console.log(tags);
                this.setState({ tags });

            })
        }
    })
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
    this.props.dispatch({
        type: 'setcentermodel/addInfosTags',
        payload: inputValue
    })
  };

  handleEditInputChange = e => {
    this.setState({ editInputValue: e.target.value });
  };

  handleEditInputConfirm = () => {
    this.setState(({ tags, editInputIndex, editInputValue }) => {
      const newTags = [...tags];
      newTags[editInputIndex] = editInputValue;

      return {
        tags: newTags,
        editInputIndex: -1,
        editInputValue: '',
      };
    });
    this.props.dispatch({
        type: 'setcentermodel/putInfosTags',
        payload: {
            id: this.state.editId,
            data: this.state.editInputValue
        }
    })
  };

  saveInputRef = input => {
    this.input = input;
  };

  saveEditInputRef = input => {
    this.editInput = input;
  };

  render() {
    const { tags, inputVisible, inputValue, editInputIndex, editInputValue , editId} = this.state;
    const { tagsList, dispatch } = this.props
    return (
      <>
        {tagsList.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={this.saveEditInputRef}
                key={tag.id}
                size="small"
                className="tag-input"
                value={editInputValue}
                onChange={this.handleEditInputChange}
                onBlur={this.handleEditInputConfirm}
                onPressEnter={this.handleEditInputConfirm}
              />
            );
          }

          const isLongTag = tag.name.length > 20;

          const tagElem = (
            <Tag
              className="edit-tag"
              key={tag.id}
              closable={index !== 0}
              onClose={() => this.handleClose(tag)}
            >
              <span
                onDoubleClick={e => {
                  if (index !== 0) {
                    this.setState({ editInputIndex: index, editInputValue: tag.name, editId: tag.id }, () => {
                      this.editInput.focus();
                    });
                    e.preventDefault();
                  }
                }}
              >
                {isLongTag ? `${tag.name.slice(0, 20)}...` : tag.name}
              </span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            className="tag-input"
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag className="site-tag-plus" onClick={this.showInput}>
            <PlusOutlined /> 添加标签
          </Tag>
        )}
      </>
    );
  }
}

export default EditableTagGroup

