import { Component, OnInit, ContentChild, ElementRef, Renderer2, AfterContentInit } from '@angular/core';

@Component({
  selector: 'num-pad',
  templateUrl: './numpad.component.html',
  styleUrls: ['./numpad.component.css']
})
export class NumpadComponent implements OnInit, AfterContentInit {

  numValue = '';

  oldNumValue = '';

  keyValues: any[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '/'];

  isNotNumBtn: boolean;

  showCustomKeyboard: boolean;

  textCaretStartPosition: number;

  startPosition: number;

  textCaretEndPosition: number;

  endPosition: number;

  @ContentChild('inputEl') inputEl: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.isNotNumBtn = true;
    this.showCustomKeyboard = false;
  }

  ngAfterContentInit() {
    this.renderer.listen(this.inputEl.nativeElement, 'click', () => {
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
    this.textCaretStartPosition = this.inputEl.nativeElement.selectionStart;
    this.startPosition = this.textCaretStartPosition;
    this.textCaretEndPosition = this.inputEl.nativeElement.selectionEnd;
    this.endPosition = this.textCaretEndPosition;
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
      }
    }
  }
}
