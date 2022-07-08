
local opened = false
local Promise = nil

RegisterNUICallback('notify', function(data)
    TriggerEvent('vCode-input:notify')
end)

RegisterNUICallback('close', function()
    Promise:resolve('closed')
    Promise = nil
    SetNuiFocus(false, false)
    opened = false
end)


exports('vOpen', function(info, cb, zb)
    if not info then return end
    Promise = promise.new()
    opened = true
    SetNuiFocus(true, true)
    SendNUIMessage({
        open = true,
        info = info,
    })
    local canYouCome = Citizen.Await(Promise)
    if canYouCome ~= 'closed' then
        cb(canYouCome)
    else
        zb('yea')
    end

end)


RegisterCommand('inputdeneme', function()
    local tablo = {
        {
            title = 'Merhabalar Ben Poyraz',
            icon = "fa-solid fa-bug",
            required = true,
            type = 'input',
        },
        {
            title = 'Merhabalar Ben Poyraz',
            icon = "fa-solid fa-bug",
            required = true,
            options = {
                { 
                    title = 'benzortladim',
                    value = 'bilmemmimimimi'
                },
                { 
                    title = 'benzortlasdaddim',
                    value = 'bilmemmimimimi'
                }
            },
        }

    }
    exports['vC-input']:vOpen(tablo, function(info)
        print(info['1'].val)
    end, function()
        print('The Input Box Was Closed!')
    end)

end)

RegisterNUICallback('submit', function(data)
    print(json.encode(data))
    Promise:resolve(data.tablo)
    Promise = nil
    SetNuiFocus(false, false)
    opened = false

end)