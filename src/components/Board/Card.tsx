import * as S from '@/components/Board/CardStyle';
import { Draggable } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { selectedCardAtom } from '@/recoil/selectedCard';
import { CgClose } from 'react-icons/cg';
import { BoardData, CardData, SelectedCardData } from '@/type';
import { boardsAtom } from '@/recoil/boards';
import { temporaryBoardAtom } from '@/recoil/temporaryBoard';
import { FcClock } from 'react-icons/fc';

interface CardProps {
  listId: string;
  cardId: string;
  cardData: CardData;
  index: number;
  boardId: string;
}

const Card = ({ listId, cardId, cardData, index, boardId }: CardProps) => {
  const [selectedCard, setSelectedCard] = useRecoilState<SelectedCardData>(selectedCardAtom);
  const [boards, setBoards] = useRecoilState<BoardData[]>(boardsAtom);
  const [temporaryBoard, setTemporaryBoard] = useRecoilState<any[]>(temporaryBoardAtom);

  const handleSaveModalData = () => {
    setSelectedCard((prev) => ({
      isModalopen: !prev.isModalopen,
      boardId: boardId,
      listId: listId,
      cardId: cardId,
      cardData: cardData,
    }));
  };
  const handleDeleteCard = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setTemporaryBoard((prev) => [...prev, boards]);
    let log = {
      logName: `${cardData.cardTitle} 카드 삭제`,
      date: new Date().getTime(),
    };
    let newBoards = boards.map((board) =>
      board.boardId === boardId
        ? {
            ...board,
            logs: [...board.logs, log],
            lists: board.lists.map((list) =>
              list.listId === listId ? { ...list, cards: list.cards.filter((card) => card.cardId != cardId) } : list,
            ),
          }
        : board,
    );
    setBoards((prev) => newBoards);
  };

  return (
    <>
      <Draggable draggableId={cardId} index={index}>
        {(draggableProvided, draggableSnapshot) => (
          <S.CardDraggable
            ref={draggableProvided.innerRef}
            {...draggableProvided.draggableProps}
            {...draggableProvided.dragHandleProps}
          >
            <S.TextAreaWrapper onClick={handleSaveModalData}>
              <S.CardHeaderWrapper>
                <S.CardTitleWrapper>{cardData.cardTitle}</S.CardTitleWrapper>
                <S.DeleteWrapper onClick={handleDeleteCard}>
                  <CgClose />
                </S.DeleteWrapper>
              </S.CardHeaderWrapper>
              <S.InformationWrapper>
                <FcClock size="20" />
                <div>{`${cardData.date.to.year}-${cardData.date.to.month}-${cardData.date.to.day}`}</div>
              </S.InformationWrapper>
            </S.TextAreaWrapper>
          </S.CardDraggable>
        )}
      </Draggable>
    </>
  );
};
export default Card;
