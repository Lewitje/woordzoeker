import useGameStore from "@/stores/gameStore";
import { useMemo } from "react";
import styles from "./wordGrid.module.css";
import clsx from "clsx";
import type { IWordGrid } from "@/types/common";
import UseWordGrid from "@/hooks/useWordGridHandler";

export type Cell = {
	row: number | null;
	col: number | null;
};

type RenderCellProps = {
	letter: string | null;
	columnIndex: number;
	rowIndex: number;
	onHighlightItem: (row: number, col: number) => void;
	startCell: Cell;
	endCell: Cell;
};

type RenderRowProps = {
	row: (string | null)[];
	rowIndex: number;
	onHighlightItem: (row: number, col: number) => void;
	startCell: Cell;
	endCell: Cell;
};

const RenderCell = ({
	letter,
	columnIndex,
	rowIndex,
	onHighlightItem,
	startCell,
	endCell,
}: RenderCellProps) => {
	const foundCells = useGameStore((state) => state.foundCells);

	const isFound = useMemo(() => {
		return !!foundCells.find(
			(o) => o.row === rowIndex && o.col === columnIndex,
		);
	}, [foundCells, rowIndex, columnIndex]);

	const isBlurred = useMemo(() => {
		if (startCell.row === null) {
			return false;
		}

		if (startCell.col !== columnIndex && startCell.row !== rowIndex) {
			return true;
		}

		return false;
	}, [startCell, rowIndex, columnIndex]);

	const isActive = useMemo(() => {
		return (
			(startCell.row === rowIndex && startCell.col === columnIndex) ||
			(endCell.row === rowIndex && endCell.col === columnIndex)
		);
	}, [startCell, endCell, rowIndex, columnIndex]);

	const isInSelection = useMemo(() => {
		const isSameRow = startCell.row === rowIndex && endCell.row === rowIndex;
		const isSameColumn =
			startCell.col === columnIndex && endCell.col === columnIndex;

		if (
			startCell.col === null ||
			startCell.row === null ||
			endCell.row === null ||
			endCell.col === null
		) {
			return false;
		}

		// If it's in the same row check if it's between the selected columns
		if (isSameRow) {
			if (startCell.col < endCell.col) {
				return columnIndex > startCell.col && columnIndex < endCell.col;
			}

			return columnIndex < startCell.col && columnIndex > endCell.col;
		}

		// If it's in the same column check if it's between the selected rows
		if (isSameColumn) {
			if (startCell.row < endCell.row) {
				return rowIndex > startCell.row && rowIndex < endCell.row;
			}

			return rowIndex < startCell.row && rowIndex > endCell.row;
		}

		return false;
	}, [startCell, endCell, rowIndex, columnIndex]);

	return (
		<div
			onClick={() => onHighlightItem(columnIndex, rowIndex)}
			onKeyUp={() => onHighlightItem(columnIndex, rowIndex)}
			className={clsx([
				styles.cell,
				isActive && styles.cellActive,
				isFound && styles.cellFound,
				isBlurred && styles.cellBlurred,
				isInSelection && styles.cellInSelection,
			])}
		>
			{letter}
		</div>
	);
};

const RenderRow = ({
	row,
	rowIndex,
	onHighlightItem,
	startCell,
	endCell,
}: RenderRowProps) => {
	return (
		<div className={styles.rowWrapper}>
			{row.map((letter, columnIndex) => (
				<RenderCell
					key={`column-${columnIndex}-row-${rowIndex}`}
					letter={letter}
					columnIndex={columnIndex}
					rowIndex={rowIndex}
					onHighlightItem={onHighlightItem}
					startCell={startCell}
					endCell={endCell}
				/>
			))}
		</div>
	);
};

export function WordGrid() {
	const wordGrid = useGameStore<IWordGrid>((state) => state.wordGrid);

	const { startCell, endCell, onHighlightItem } = UseWordGrid();

	return (
		<div className={styles.gridWrapper}>
			{wordGrid.map((row, i) => (
				<RenderRow
					key={`row-${i}`}
					startCell={startCell}
					endCell={endCell}
					row={row}
					rowIndex={i}
					onHighlightItem={onHighlightItem}
				/>
			))}
		</div>
	);
}
