import { Component, OnInit, ContentChild, ElementRef, Renderer2, AfterContentInit, ViewChild } from '@angular/core';
@Component({
  selector: 'num-pad',
  templateUrl: './numpad.component.html',
  styleUrls: ['./numpad.component.css']
})
export class NumpadComponent implements OnInit, AfterContentInit {

  numValue = '';

  oldNumValue = '';

  keyValues: any[] = [{value: '1', disable: false},
                      {value: '2', disable: false},
                      {value: '3', disable: false},
                      {value: '4', disable: false},
                      {value: '5', disable: false},
                      {value: '6', disable: false},
                      {value: '7', disable: false},
                      {value: '8', disable: false},
                      {value: '9', disable: false},
                      {value: '.', disable: false},
                      {value: '0', disable: false},
                      {value: '/', disable: false}];

  isNotNumBtn: boolean;

  showCustomKeyboard: boolean;

  textCaretStartPosition: number;

  startPosition: number;

  textCaretEndPosition: number;

  @ContentChild('inputEl') inputEl: ElementRef;

  private inputElement;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.isNotNumBtn = true;
    this.showCustomKeyboard = false;
  }

  ngAfterContentInit() {
    this.inputElement = this.inputEl.nativeElement;
    this.renderer.listen(this.inputElement, 'click', () => {
      this.setTextCaretPostion();
    });
    this.renderer.listen(this.inputElement, 'touchend', () => {
      this.setTextCaretPostion();
    });
    this.renderer.listen(this.inputElement, 'select', () => {
      this.setTextCaretPostion();
    });
  }

  setInputValue(key) {
    this.changeInputValue(this.startPosition, 0, key);
    this.startPosition = this.startPosition + 1;
  }

  delete() {
    if (this.startPosition > 0 || this.textCaretStartPosition !== this.textCaretEndPosition) {
      (this.textCaretStartPosition === this.textCaretEndPosition) ?
                      (this.changeInputValue(this.startPosition - 1, 1, null), this.startPosition = this.startPosition - 1)  :
                      (this.changeInputValue(this.startPosition, this.textCaretEndPosition - this.startPosition , null),
                                            this.startPosition = this.startPosition);
      this.textCaretStartPosition = this.startPosition;
      this.textCaretEndPosition = this.startPosition;
    }
  }

  changeInputValue(startPosition, spliceNos, value) {
    const numValueArr = Array.from(this.numValue);
    numValueArr.splice(startPosition, spliceNos, value);
    this.numValue = numValueArr.join('');
  }

  confirm() {
    this.showCustomKeyboard = false;
  }

  setTextCaretPostion() {
    this.textCaretStartPosition = this.inputElement.selectionStart;
    this.startPosition = this.textCaretStartPosition;
    this.textCaretEndPosition = this.inputElement.selectionEnd;
  }

  cancel() {
    this.numValue = this.oldNumValue;
    this.showCustomKeyboard = false;
  }

  toggleKeyBoard(event: Object) {
    if (event) {
      if (event['value'] === true && this.showCustomKeyboard) {
        this.showCustomKeyboard = false;
      } else if (event['value'] === false && !this.showCustomKeyboard) {
        this.showCustomKeyboard = true;
        this.oldNumValue = this.numValue;
        this.findPositionOfInputEl();
      }
    }
  }

  findPositionOfInputEl() {
    setTimeout(() => {
    const inputRect = this.inputElement.getBoundingClientRect();
    const viewPortHeight = window.innerHeight;
    const numpadContainerEl = this.elRef.nativeElement.querySelector('#numpadContainer').getBoundingClientRect();
      console.log(inputRect, viewPortHeight, numpadContainerEl);
    });
   }
}
