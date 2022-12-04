<?php

namespace App\Http\Livewire;

use App\Models\Contract;
use Filament\Tables;
use Illuminate\Contracts\View\View;
use Illuminate\Database\Eloquent\Builder;
use Livewire\Component;

class ClientContractInfo extends Component implements Tables\Contracts\HasTable
{
    use Tables\Concerns\InteractsWithTable;

    protected function getTableQuery(): Builder
    {
        /*
            SELECT bz_clients.email
            from bz_docs
            inner join bz_clients on bz_docs.client_id = bz_clients.id
            where bz_docs.number like '2023-крым-2%' and bz_clients.email not like ''
            group by bz_clients.email;
         */
        return Contract::query()->select('bz_clients.email')
            ->join('bz_clients', function($join)
        {
            $join->on('bz_docs.client_id', '=', 'bz_clients.id')
                ->where('bz_clients.email','not like', '');
        })
            ->where('bz_docs.number','like', '2023-крым-2%')
            ->groupBy('bz_clients.email');
    }

    protected function getTableQueryStringIdentifier(): string
    {
        return 'bz_docs';
    }

    protected function getTableColumns(): array
    {
        return [
            Tables\Columns\TextColumn::make('email'),
            ];
    }

    public function isTableSearchable(): bool
    {
        return true;
    }

    protected function applySearchToTableQuery(Builder $query): Builder
    {
        if (filled($searchQuery = $this->getTableSearchQuery())) {
            $query->where('email','like', '%' . $searchQuery . '%');
        }

        return $query;
    }

    protected function getTableFilters(): array
    {
        return [ ];
    }

    protected function getTableActions(): array
    {
        return [ ];
    }

    protected function getTableBulkActions(): array
    {
        return [ ];
    }

    public function getTableRecordKey(\Illuminate\Database\Eloquent\Model $record): string
    {
        return uniqid();
    }

    protected function isTablePaginationEnabled(): bool
    {
        return false;
    }

    /*    protected function getTableRecordsPerPageSelectOptions(): array
        {
            return [10, 25, 50, 100];
        }*/

    public function render(): View
    {
        return view('livewire.client-contract-info');
    }
}
