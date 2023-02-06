import { useEffect, useState } from 'react';
import Board from '@/components/Board/Board';
import Log from '@/pages/Log/index';
import * as S from '@/pages/Board/indexStyle';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { boardsAtom } from '@/recoil/boardsAtom';
import Swal from 'sweetalert2';
import { BoardInterface } from '@/type';
import { MdDeleteForever, MdOutlineAccessTime } from 'react-icons/md';
import { AiFillSetting } from 'react-icons/ai';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { temporaryBoardAtom } from '@/recoil/temporaryBoardAtom';
import rgbHex from 'rgb-hex';
import { SketchPicker } from 'react-color';

function BoardPage() {
  let { boardId } = useParams();
  const [boards, setBoards] = useRecoilState<BoardInterface[]>(boardsAtom);
  const [temporaryBoard, setTemporaryBoard] = useRecoilState(temporaryBoardAtom);
  let [board] = boards.filter((board) => board.boardId === boardId);
  const [boardTitle, setBoardTitle] = useState<string>(board.boardTitle);
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState('#ffffff');

  useEffect(() => {
    setTemporaryBoard((prev) => []);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBoardTitle((prev) => e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      removeFocus();
      e.preventDefault();
      handleSaveData();
    }
  };

  const removeFocus = () => {
    (document.activeElement as HTMLElement).blur();
  };

  const handleSaveData = () => {
    let newBoards = boards.map((board) => (board.boardId === boardId ? { ...board, boardTitle: boardTitle } : board));
    setBoards((prev) => newBoards);
  };

  const handleGobackBoard = () => {
    if (temporaryBoard.length !== 0) {
      setBoards((prev) => temporaryBoard[temporaryBoard.length - 1]);
      let newTemporaryBoard = [...temporaryBoard];
      newTemporaryBoard.pop();
      setTemporaryBoard((prev) => newTemporaryBoard);
    }
  };

  const handleDeleteBoard = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        location.replace(`/remove/${boardId}`);
      }
    });
  };

  const handleChangeLogState = () => {
    setIsLogOpen((prev) => !prev);
  };

  const handleShowColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleCloseColorPicker = () => {
    setShowColorPicker(false);
  };

  const handleColorChange = (sketchColor: { rgb: { r: number; g: number; b: number; a?: number | undefined } }) => {
    setColor('#' + rgbHex(sketchColor.rgb.r, sketchColor.rgb.g, sketchColor.rgb.b, sketchColor.rgb.a));
  };

  return (
    <S.BoardWrapper color={color}>
      <S.BoardTitle
        spellCheck="false"
        boardTitle={boardTitle}
        value={boardTitle}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          handleSaveData();
        }}
      ></S.BoardTitle>
      <S.GoBackBtn isGoBackAvavailable={temporaryBoard.length !== 0} onClick={handleGobackBoard}>
        <RiArrowGoBackLine size="30px" color="#333333" />
      </S.GoBackBtn>
      <S.DeleteBtn onClick={handleDeleteBoard}>
        <MdDeleteForever size="30px" color="#333333" />
      </S.DeleteBtn>
      <S.SettingBtn onClick={handleShowColorPicker}>
        <AiFillSetting size="30px" color="#333333" />
        {showColorPicker ? (
          <S.PopOver>
            <S.Cover onClick={handleCloseColorPicker} />
            <SketchPicker color={color} onChange={handleColorChange} />
          </S.PopOver>
        ) : null}
      </S.SettingBtn>
      <S.LogBtn onClick={handleChangeLogState}>
        <MdOutlineAccessTime size="30px" color="#333333" />
      </S.LogBtn>
      <Board boards={boards} setBoards={setBoards} boardId={boardId} />
      {isLogOpen && <Log logs={board.logs} />}
    </S.BoardWrapper>
  );
}
export default BoardPage;
