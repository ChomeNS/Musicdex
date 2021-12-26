import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  VStack,
  Text,
  Box,
  useBreakpointValue,
  IconButton,
  CSSObject,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiMoreHorizontal } from "react-icons/fi";
import { useTable, useSortBy, Column } from "react-table";
import {
  ContextMenuItem,
  ContextMenuList,
  ContextMenuTrigger,
  useContextTrigger,
} from "../context-menu";
import { useStoreActions } from "../../store";
import { PlaylistSongTableDropDownMenu } from "./SongTableDropdownButton";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useClipboardWithToast } from "../../modules/common/clipboard";
import { useNavigate } from "react-router";

type IndexedSong = Song & { idx: number };

export interface SongTableProps {
  songs: Song[];

  // reactive hooks:
  songClicked?: (e: React.MouseEvent, s: Song) => void;
  songDropdownMenuRenderer?: (cellInfo: any) => JSX.Element;
  songRightClickContextMenuRenderer?: (_: {
    song: Song;
    menuId: string;
    closeContextMenu: () => void;
  }) => JSX.Element;

  // table controls:
  isSortable?: boolean; // default true

  menuId?: string;
}

export const SongTable = ({
  songs,
  songClicked,
  songDropdownMenuRenderer,
  songRightClickContextMenuRenderer,
  isSortable = true,
  menuId,
}: SongTableProps) => {
  const { t } = useTranslation();
  // const t = (str: string, ..._: { date: Date; }[]) => str;
  const queueSongs = useStoreActions((actions) => actions.playback.queueSongs);
  const s: IndexedSong[] = React.useMemo(() => {
    return songs.map((v, i) => {
      return { ...v, idx: i };
    });
  }, [songs]);
  const columns: Column<IndexedSong>[] = React.useMemo<Column<IndexedSong>[]>(
    () => [
      {
        Header: "#",
        accessor: "idx",
      },
      {
        Header: "Title",
        accessor: "name",
        Cell: (cellInfo: any) => {
          // console.log(cellInfo);
          return (
            <VStack alignItems="start" spacing={1}>
              <span>{cellInfo.row.original?.name}</span>
              <Text color="whiteAlpha.600" fontWeight={300} fontSize="sm">
                {cellInfo.row.original.channel?.name}
              </Text>
            </VStack>
          );
        },
      },
      {
        id: "channel",
        Header: "ChannelName",
        accessor: (row: IndexedSong) =>
          row.channel?.english_name || row.channel?.name,
      },
      {
        Header: "Original Artist",
        accessor: "original_artist",
      },
      {
        id: "dur",
        Header: "Duration",
        accessor: (row: { end: number; start: number }) => {
          return row.end - row.start;
        },
        isNumeric: true,
      },
      {
        id: "date",
        Header: "Sang On",
        accessor: (row: { available_at: Date }) =>
          t("relativeDate", { date: new Date(row?.available_at) }),
      },
      {
        id: "...",
        Header: "",
        disableSortBy: true,
        accessor: "idx",
        Cell: (cellInfo: any) => {
          // console.log(cellInfo);
          return <PlaylistSongTableDropDownMenu song={cellInfo.row.original} />;
        },
      },
    ],
    []
  );

  const showAddDialog = useStoreActions(
    (action) => action.addPlaylist.showPlaylistAddDialog
  );

  const copyToClipboard = useClipboardWithToast();

  const navigate = useNavigate();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    toggleHideColumn,
  } = useTable(
    {
      columns: columns as any,
      data: s,
      initialState: { hiddenColumns: ["channel"] },
      disableSortBy: !isSortable,
    },
    useSortBy
  );

  const isXL = useBreakpointValue({ base: false, xl: true });

  useEffect(() => {
    toggleHideColumn("original_artist", !isXL);
    toggleHideColumn("idx", !isXL);
  }, [isXL, toggleHideColumn]);

  const [menuIdStat] = useState(
    () => menuId || Math.floor(Math.random() * 10000).toString()
  );

  const contextMenuTrigger = useContextTrigger({ menuId: menuIdStat });

  const HOVER_ROW_STYLE: CSSObject = {
    backgroundColor: useColorModeValue("bgAlpha.200", "bgAlpha.800"),
  };

  const defaultClickBehavior = (
    e: React.MouseEvent<any, MouseEvent>,
    song: Song
  ) =>
    queueSongs({
      songs: [song],
      immediatelyPlay: false,
    });

  return (
    <>
      <ContextMenuList
        menuId={menuIdStat}
        render={({ menuId, closeContextMenus, passData: song }) => {
          if (songRightClickContextMenuRenderer)
            return songRightClickContextMenuRenderer({
              menuId,
              closeContextMenu: closeContextMenus,
              song,
            });

          return (
            <>
              <ContextMenuItem
                onClick={() => {
                  queueSongs({ songs: [song], immediatelyPlay: true });
                }}
                colorScheme="gray"
              >
                Play Now
              </ContextMenuItem>
              <ContextMenuItem
                onClick={() => {
                  copyToClipboard(`${window.location.origin}/song/${song.id}`);
                }}
                colorScheme="gray"
              >
                Copy Song Link
              </ContextMenuItem>
              <ContextMenuItem
                onClick={() => {
                  showAddDialog(song);
                }}
                colorScheme="gray"
              >
                Add To Playlist...
              </ContextMenuItem>
              <hr style={{ marginTop: "0.4rem", marginBottom: "0.4rem" }} />
              <ContextMenuItem
                onClick={() => {
                  navigate("/song/" + song.id);
                }}
                colorScheme="gray"
              >
                Go To Song Page
              </ContextMenuItem>
              <ContextMenuItem
                onClick={({ passData }) => {}}
                colorScheme="gray"
              >
                Go To Video Page
              </ContextMenuItem>
              <ContextMenuItem
                onClick={({ passData }) => {}}
                colorScheme="gray"
              >
                Go To Channel Page
              </ContextMenuItem>
            </>
          );
        }}
      ></ContextMenuList>

      <Table {...getTableProps()} size={isXL ? "md" : "sm"}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={(column as any).isNumeric}
                >
                  {column.isSorted &&
                    (column.isSortedDesc ? (
                      <Icon as={FaChevronDown} display="inline" mr="2" />
                    ) : (
                      <Icon as={FaChevronUp} display="inline" mr="2" />
                    ))}
                  {column.render("Header")}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr
                {...row.getRowProps()}
                onContextMenu={(e) => {
                  contextMenuTrigger(e, row.original);
                }}
                _hover={HOVER_ROW_STYLE}
              >
                {row.cells.map((cell) => (
                  <Td
                    {...cell.getCellProps()}
                    isNumeric={(cell.column as any).isNumeric}
                    {...(cell.column.id !== "..."
                      ? {
                          onClick: (e) => {
                            songClicked
                              ? songClicked(e, row.original)
                              : defaultClickBehavior(e as any, row.original);
                          },
                        }
                      : {})}
                  >
                    {cell.render("Cell")}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
        <Tfoot>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={(column as any).isNumeric}
                >
                  {column.render("Header")}
                  <Box pl="4">
                    {column.isSorted ? (column.isSortedDesc ? "v" : "^") : ""}
                  </Box>
                </Th>
              ))}
            </Tr>
          ))}
        </Tfoot>
      </Table>
    </>
  );
};
