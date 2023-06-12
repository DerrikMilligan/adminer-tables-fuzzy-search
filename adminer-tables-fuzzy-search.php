<?php

/**
 * Add fuzzy search in tables for Adminer
 *
 * @link https://github.com/DerrikMilligan/adminer-tables-fuzzy-search
 *
 * @author Derrik Milligan, https://github.com/DerrikMilligan
 */
class AdminerTablesFuzzySearch {
	function tablesPrint($tables) {
?>

<style media="screen" type="text/css">
.hide {
  display: none;
}

#menu #tables li {
	border: 2px solid transparent;
}

#menu #tables li.selected-table-entry {
  border-color: rgb(76, 113, 166);
}
</style>

<script src="https://cdn.jsdelivr.net/npm/fuse.js@6.6.2/dist/fuse.basic.min.js" <?= nonce(); ?>></script>

<script type="text/javascript" <?= nonce(); ?>>
	<?php include("adminer-tables-fuzzy-search.js"); ?>
</script>

<p style="padding-bottom: 0; border-bottom: none;">
	<input id='fuzzy_tables_search_input' accesskey="F" style="width: 100%;" autofocus/>
</p>

<?php
	}
}
?>
